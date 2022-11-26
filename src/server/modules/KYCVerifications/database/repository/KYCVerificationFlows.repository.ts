import { KYCVerificationFlowStepsRepository } from ".";
import { sequelize } from "../../../../../lib/database/sequelize";
import { IKYCVerificationFlow, IKYCVerificationFlowStep, IKYCVerificationFlowAttributes, IKYCVerificationFlowPK } from "../../domain/interface";
import { KYCVerificationFlows, KYCVerificationFlowSteps } from "../model";

export const findByResourceID = (query : IKYCVerificationFlowAttributes) : Promise<IKYCVerificationFlow> => { 
  return KYCVerificationFlows.findOne({ where : { ResourceID: query.ResourceID }, include: [KYCVerificationFlowSteps]})
  .then((val:KYCVerificationFlows | null) => val?.get({plain:true}) as IKYCVerificationFlow);
};

export const findByPk = (pk : IKYCVerificationFlowPK) : Promise<IKYCVerificationFlow> => { 
  return KYCVerificationFlows.findOne({ where : { IdKYCVerificationFlow: pk }, include: [KYCVerificationFlowSteps]})
  .then((val:KYCVerificationFlows | null) => val?.get({plain:true}) as IKYCVerificationFlow);
};

export const createOrUpdate = (item: IKYCVerificationFlow, options?:any) => {
  return KYCVerificationFlows.upsert(item, options)
  .then((value:[KYCVerificationFlows, boolean | null]) => value[0]?.get({plain:true}) as IKYCVerificationFlow);
};//?? usamos o usamos create y hacemos uno para update status??

export const createStep = async (item: IKYCVerificationFlow, step: IKYCVerificationFlowStep) : Promise<IKYCVerificationFlowStep> => {
  step.IdKYCVerificationFlow = item.IdKYCVerificationFlow!;
  return KYCVerificationFlowStepsRepository.createOrUpdate(step);
}

export const addSteps = async (item: IKYCVerificationFlow) => {
  const t = await sequelize.transaction();
  try {

    for await(const input of item.KYCVerificationFlowSteps!)
      await KYCVerificationFlowStepsRepository.createOrUpdate(input, { transaction: t });

    t.commit();
    return findByPk(item.IdKYCVerificationFlow!);
  } catch(e) {
    t.rollback();
    throw e;
  }
}