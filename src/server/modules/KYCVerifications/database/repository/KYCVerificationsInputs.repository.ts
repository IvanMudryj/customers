import { IKYCVerificationsInputs } from "../../domain/interface";
import { KYCVerificationsInputs } from "../model";

export const findByPk = (query : IKYCVerificationsInputs) => { 
    return KYCVerificationsInputs.findOne({ where : { IdKYCVerification: query.IdKYCVerification }})
    .then((value:KYCVerificationsInputs | null) => value?.get({plain:true}) as IKYCVerificationsInputs);
};

export const findByIdKYCVerificationAndInputType = (query : IKYCVerificationsInputs) => {
    return KYCVerificationsInputs.findOne({ where : { IdKYCVerification: query.IdKYCVerification, InputType: query.InputType }})
    .then((value:KYCVerificationsInputs | null) => value?.get({plain:true}) as IKYCVerificationsInputs);
};

export const create = (item: IKYCVerificationsInputs, options?:any) => {
    return KYCVerificationsInputs.create(item, options)
    .then((value:void | KYCVerificationsInputs) => value?.get({plain:true}) as IKYCVerificationsInputs);
};

export const createOrUpdate = (item: IKYCVerificationsInputs, options?:any) => {
    return KYCVerificationsInputs.upsert(item, options)
    .then((value:[KYCVerificationsInputs, boolean | null]) => value[0]?.get({plain:true}) as IKYCVerificationsInputs);
};
