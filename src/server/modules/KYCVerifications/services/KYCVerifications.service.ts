
import { AxiosResponse } from "axios";
import logger from "../../../../utils/logger";
import { metamapHttpWrapper } from "../../../../utils/metamapHttpWrapper";
import { KYCFlowsRepository, KYCVerificationsRepository} from "../database/repository"
import { IKYCVerifications } from "../domain/interface";
import { FlowMetadata, Metamap_InitResponse, Metamap_InputFile, Metamap_InputResponse, V4UUID } from "../interfaces/FlowMetadata.interface";
import FormData from 'form-data';

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
  let oResponse:AxiosResponse<Metamap_InitResponse> = await metamapHttpWrapper.post("/v2/verifications/", oMetaDataRequest);

  if(!oKYCVerifications && oResponse.status == 200) 
    oKYCVerifications = await KYCVerificationsRepository.create({
      IdKYCVerification: IdKYCVerification,
      ResponseStatus: oResponse.data.expired ? 'expired' : 'created',
      IdKYCVerificationStatus: 1,
      Request: oMetaDataRequest,
      Response: oResponse.data,
      Identity: oResponse.data.identity
    });

  logger.info(oKYCVerifications?.IdKYCVerification);
  return oKYCVerifications!;
};

const sendInput = async (IdKYCVerification:V4UUID, Type:string, Country:string, File:any, Filename: string) : Promise<IKYCVerifications | null> => {

  let oKYCVerifications:IKYCVerifications | null = await KYCVerificationsRepository.findByPk({ IdKYCVerification });
  if(!oKYCVerifications) throw new Error("IdKYCVerification not found");
  if(oKYCVerifications.IdKYCVerificationStatus! > 2) throw new Error("IdKYCVerification already setup");

  let inputFileData:Metamap_InputFile =  {
    "inputType": "selfie-photo",
    "data": {
      "type": "selfie-photo",
      "filename": Filename
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
  body.append("document", File, inputFileData.data.filename);
  let oResponse:AxiosResponse<[Metamap_InputResponse]> = await metamapHttpWrapper.post(`/v2/identities/${oKYCVerifications.Identity}/send-input`, body, { headers: { "Content-Type": "application/x-www-form-urlencoded" }});
  if(!oResponse.data.find(i => i.result)) throw new Error("Input Type Locked");
  
  let oKYCVerificationInput = oKYCVerifications.KYCVerificationsInputs!.find(i => i.InputType == Type);
  if(!oKYCVerificationInput) 
    oKYCVerifications.KYCVerificationsInputs!.push({
      IdKYCVerification: IdKYCVerification,
      InputType: Type,
      Value: inputFileData.data.filename,
      MetaData: inputFileData
    });
  else 
    oKYCVerificationInput.MetaData = inputFileData;
  
  oKYCVerifications = await KYCVerificationsRepository.addInputs(oKYCVerifications);

  return oKYCVerifications;
};

export {
  getAllFlows,
  initFlow,
  sendInput
};
