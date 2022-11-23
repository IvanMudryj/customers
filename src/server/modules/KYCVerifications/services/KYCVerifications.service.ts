
import logger from "../../../../utils/logger";
import { metamapHttpWrapper } from "../../../../utils/metamapHttpWrapper";
import { KYCFlows, KYCVerifications } from "../database/init-models";
import { FlowMetadata, Metamap_InitResponse, V4UUID } from "../interfaces/FlowMetadata.interface";

const getAllFlows = () => KYCFlows.findAll();

const initFlow = async (FlowID: string, IdKYCVerification : V4UUID) : Promise<string> => {

  if(!IdKYCVerification) 
    IdKYCVerification = V4UUID.getRandom();

  let oMetaDataRequest: FlowMetadata = {
    flowId: FlowID,
    metadata: {
      IdKYCVerification
    }
  }

  let oKYCVerifications:KYCVerifications | null = await KYCVerifications.findByPk(`${IdKYCVerification}`);
  let oResponse:Metamap_InitResponse = await metamapHttpWrapper.post<FlowMetadata, Metamap_InitResponse>("/v2/verifications/", oMetaDataRequest);

  if(!oKYCVerifications) 
    oKYCVerifications = await KYCVerifications.create({
      ResponseStatus: oResponse.expired ? 'expired' : 'created',
      IdKYCVerification: IdKYCVerification,
      IdKYCVerificationStatus: 1,
      Request: oMetaDataRequest,
      Response: oResponse,
      Identity: oResponse.identity
    });

  logger.info(oKYCVerifications.IdKYCVerification);
  return `${oKYCVerifications.IdKYCVerification}`;
};

export {
  getAllFlows,
  initFlow
};
