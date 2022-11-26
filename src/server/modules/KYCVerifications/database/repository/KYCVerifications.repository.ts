import { KYCVerificationsInputsRepository } from ".";
import { sequelize } from "../../../../../lib/database/sequelize";
import { EKYCVerificationStatus, IKYCVerification, IKYCVerificationAttributes, IKYCVerificationPK } from "../../domain/interface";
import { KYCVerifications, KYCVerificationsInputs } from "../model";

export const findByPk = (pk: IKYCVerificationPK) : Promise<IKYCVerification> => { 
  return KYCVerifications.findOne({ where : { IdKYCVerification: pk }, include: [KYCVerificationsInputs]})
  .then((val:KYCVerifications | null) => val?.get({plain:true}) as IKYCVerification);
};

export const create = (item: IKYCVerification, options?:any) : Promise<IKYCVerification>=> {
  return KYCVerifications.create(item, options)
  .then((value:void | KYCVerifications) => value?.get({plain:true}) as IKYCVerification);
};

export const createIfNotExists = (item: IKYCVerification, options?:any) : Promise<IKYCVerification>=> {
  return findByPk(item.IdKYCVerification)
  .then((oKYCVerification:IKYCVerification) => {
    return (!oKYCVerification) ? create(item, options) : item;
  });
};

export const updateStatus = (IdKYCVerification:IKYCVerificationPK, KYCVerificationStatus:EKYCVerificationStatus, options?:any) : Promise<any>=> {
  return update({ IdKYCVerificationStatus: KYCVerificationStatus }, { where : { IdKYCVerification: IdKYCVerification }, ...options});
};

export const update = (IdKYCVerification:IKYCVerificationPK, item:IKYCVerificationAttributes, options?:any) : Promise<any>=> {
  return KYCVerifications.update(item, { where : { IdKYCVerification: IdKYCVerification }, ...options});
};

export const addInputs = async (item: IKYCVerification) => {
  const t = await sequelize.transaction();
  try {

    for await(const input of item.KYCVerificationsInputs!)
      await KYCVerificationsInputsRepository.createOrUpdate(input, { transaction: t });
    await updateStatus(item.IdKYCVerification, item.KYCVerificationsInputs?.length == 3 ? EKYCVerificationStatus.READY : EKYCVerificationStatus.INCOMPLETE, { transaction: t })
    
    t.commit();
    return findByPk(item);
  } catch(e) {
    t.rollback();
    throw e;
  }
}