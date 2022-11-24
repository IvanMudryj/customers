import Sequelize from "sequelize";
import { KYCVerificationsInputsRepository } from ".";
import { sequelize } from "../../../../../lib/database/sequelize";
import { IKYCVerifications } from "../../domain/interface";
import { KYCVerifications } from "../model";

export const findByPk = (query : IKYCVerifications) => KYCVerifications.findOne({ where : { IdKYCVerification: query.IdKYCVerification }});
export const create = (item: IKYCVerifications) => KYCVerifications.create(item);

export const addInputs = async (item: IKYCVerifications) => {
  return sequelize.transaction(async (t:Sequelize.Transaction) => {
    item.KYCVerificationInputs?.forEach(input => {
      KYCVerificationsInputsRepository.create(input, { transaction: t });
    });
    KYCVerifications.update({ IdKYCVerificationStatus: 2 }, { where : { IdKYCVerification: item.IdKYCVerification }, transaction: t});
  });
}