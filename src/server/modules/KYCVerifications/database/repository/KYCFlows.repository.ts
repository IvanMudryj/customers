import { IKYCFlow, IKYCFlowPK } from "../../domain/interface";
import { KYCFlows } from "../model";

export const findAll = () : Promise<IKYCFlow[]> => {
    return KYCFlows.findAll()
    .then((values:KYCFlows[]) => values.map((i:KYCFlows) => i?.get({plain:true})) as IKYCFlow[]);
  }

  export const findByPk = (pk: IKYCFlowPK) : Promise<IKYCFlow> => { 
    return KYCFlows.findOne({ where : { FlowID: pk }})
    .then((val:KYCFlows | null) => val?.get({plain:true}) as IKYCFlow);
  };
