import { IKYCVerificationFlowStep } from "../../domain/interface";
import { KYCVerificationFlowSteps } from "../model";

export const createOrUpdate = (item: IKYCVerificationFlowStep, options?:any) => {
    return KYCVerificationFlowSteps.upsert(item, options)
    .then((value:[KYCVerificationFlowSteps, boolean | null]) => value[0]?.get({plain:true}) as IKYCVerificationFlowStep);
};
