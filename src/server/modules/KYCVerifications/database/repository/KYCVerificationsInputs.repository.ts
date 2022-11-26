import { IKYCVerificationInput, IKYCVerificationInputAttributes, IKYCVerificationInputPK } from "../../domain/interface";
import { KYCVerificationsInputs } from "../model";

export const findByPk = (pk : IKYCVerificationInputPK) => { 
    return KYCVerificationsInputs.findOne({ where : { IdKYCVerification: pk }})
    .then((value:KYCVerificationsInputs | null) => value?.get({plain:true}) as IKYCVerificationInput);
};

export const findByIdKYCVerificationAndInputType = (item : IKYCVerificationInput) => {
    return KYCVerificationsInputs.findOne({ where : { IdKYCVerification: item.IdKYCVerification, InputType: item.InputType }})
    .then((value:KYCVerificationsInputs | null) => value?.get({plain:true}) as IKYCVerificationInput);
};

export const create = (item: IKYCVerificationInputAttributes, options?:any) => {
    return KYCVerificationsInputs.create(item, options)
    .then((value:void | KYCVerificationsInputs) => value?.get({plain:true}) as IKYCVerificationInput);
};

export const createOrUpdate = (item: IKYCVerificationInput, options?:any) => {
    return KYCVerificationsInputs.upsert(item, options)
    .then((value:[KYCVerificationsInputs, boolean | null]) => value[0]?.get({plain:true}) as IKYCVerificationInput);
};
