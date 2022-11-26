import { KYCVerificationsInputsRepository } from ".";
import { sequelize } from "../../../../../lib/database/sequelize";
import { IKYCVerifications } from "../../domain/interface";
import { KYCVerifications, KYCVerificationsInputs } from "../model";

export const findByPk = (query : IKYCVerifications) : Promise<IKYCVerifications> => { 
  return KYCVerifications.findOne({ where : { IdKYCVerification: query.IdKYCVerification }, include: [KYCVerificationsInputs]})
  .then((val:KYCVerifications | null) => val?.get({plain:true}) as IKYCVerifications);
};

export const create = (item: IKYCVerifications, options?:any) : Promise<IKYCVerifications>=> {
  return KYCVerifications.create(item, options)
  .then((value:void | KYCVerifications) => value?.get({plain:true}) as IKYCVerifications);
  
};

export const addInputs = async (item: IKYCVerifications) => {
  const t = await sequelize.transaction();
  try {

    for await(const input of item.KYCVerificationsInputs!)
      await KYCVerificationsInputsRepository.createOrUpdate(input, { transaction: t });
    
    await KYCVerifications.update({ IdKYCVerificationStatus: item.KYCVerificationsInputs?.length == 3 ? 3 : 2 }, { where : { IdKYCVerification: item.IdKYCVerification }, transaction: t});
    
    t.commit();
    return findByPk(item);
  } catch(e) {
    t.rollback();
    throw e;
  }
}