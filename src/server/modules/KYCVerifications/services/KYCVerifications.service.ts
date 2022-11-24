
import logger from "../../../../utils/logger";
import { metamapHttpWrapper } from "../../../../utils/metamapHttpWrapper";
import { KYCFlowsRepository, KYCVerificationsInputsRepository, KYCVerificationsRepository} from "../database/repository"
import { IKYCVerifications, IKYCVerificationsInputs } from "../domain/interface";
import { FlowMetadata, Metamap_InitResponse, Metamap_InputResponse, V4UUID } from "../interfaces/FlowMetadata.interface";

const getAllFlows = () => KYCFlowsRepository.findAll();

const initFlow = async (FlowID:string, IdKYCVerification:V4UUID) : Promise<IKYCVerifications> => {

  if(!IdKYCVerification) 
    IdKYCVerification = V4UUID.getRandom();

  let oMetaDataRequest: FlowMetadata = {
    flowId: FlowID,
    metadata: {
      IdKYCVerification
    }
  }

  let oKYCVerifications:IKYCVerifications | null = await KYCVerificationsRepository.findByPk({ IdKYCVerification });
  let oResponse:Metamap_InitResponse = await metamapHttpWrapper.post<FlowMetadata, Metamap_InitResponse>("/v2/verifications/", oMetaDataRequest);

  if(!oKYCVerifications) 
    oKYCVerifications = await KYCVerificationsRepository.create({
      IdKYCVerification: IdKYCVerification,
      ResponseStatus: oResponse.expired ? 'expired' : 'created',
      IdKYCVerificationStatus: 1,
      Request: oMetaDataRequest,
      Response: oResponse,
      Identity: oResponse.identity
    });

  logger.info(oKYCVerifications.IdKYCVerification);
  return oKYCVerifications;
};

const sendInput = async (IdKYCVerification:V4UUID, Type:string, Country:string, File:Uint8Array) : Promise<IKYCVerifications | null> => {

  let oKYCVerifications:IKYCVerifications | null = await KYCVerificationsRepository.findByPk({ IdKYCVerification });
  if(!oKYCVerifications) throw new Error("IdKYCVerification not found");

  let inputFileData:any =  {
    "inputType": "selfie-photo",
    "data": {
      "type": "selfie-photo",
      "filename": V4UUID.getRandom()
    }};

  if(Country && (Type == "ID-FRONT" || Type == "ID-BACK")) {
    inputFileData["inputType"] = "document-photo";
    inputFileData["group"] = 0;
    inputFileData.data["type"] = "national-id";
    inputFileData.data["country"] = Country;
    inputFileData.data["page"] = Type == "ID-FRONT" ? "front" : "back";
  }
  else if(Type != "SELFIE") throw new Error("Invalid Input data");

  let body = new FormData();
  body.append("inputs", JSON.stringify([inputFileData]));
  body.append("document", new Blob([File]), inputFileData.data.filename);

  let oResponse:[Metamap_InputResponse] = await metamapHttpWrapper.post("/v2/identities/{{ID_VERIF_02}}/send-input", body, { headers: { "Content-Type": "application/x-www-form-urlencoded" }});

  if(!oResponse.find(i=>i.result)) throw new Error("Invalid Input data MODIFICAR TEXTO");

  let oKYCVerificationInput = await KYCVerificationsInputsRepository.findByIdKYCVerificationAndInputType({IdKYCVerification: IdKYCVerification, InputType: Type});
  if(!oKYCVerificationInput) 
  {
    if(!oKYCVerifications?.KYCVerificationInputs?.length) oKYCVerifications.KYCVerificationInputs = [];
    oKYCVerifications?.KYCVerificationInputs.push({
      IdKYCVerification: IdKYCVerification,
      InputType: Type,
      Value: inputFileData.data.filename,
      MetaData: inputFileData
    });
    KYCVerificationsRepository.addInputs(oKYCVerifications);
  }

  return oKYCVerifications;
};

export {
  getAllFlows,
  initFlow,
  sendInput
};
