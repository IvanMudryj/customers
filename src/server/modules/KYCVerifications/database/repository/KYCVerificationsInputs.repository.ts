import { IKYCVerificationsInputs } from "../../domain/interface";
import { KYCVerificationsInputs } from "../model";

export const findByPk = (query : IKYCVerificationsInputs) => KYCVerificationsInputs.findOne({ where : { IdKYCVerification: query.IdKYCVerification }});
export const findByIdKYCVerificationAndInputType = (query : IKYCVerificationsInputs) => KYCVerificationsInputs.findOne({ where : { IdKYCVerification: query.IdKYCVerification, InputType: query.InputType }});
export const create = (item: IKYCVerificationsInputs, options:any) => KYCVerificationsInputs.create(item, options);
