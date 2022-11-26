import { EKYCVerificationFlowStatus, IKYCVerificationFlowStep } from ".";
import { KYCVerificationPK } from "./KYCVerifications.interface";

export interface KYCVerificationFlowEntity extends KYCVerificationFlowAttributes { 
  IdKYCVerificationFlow?: KYCVerificationFlowPK
}

export interface KYCVerificationFlowPK extends Number { }

export interface KYCVerificationFlowAttributes {
  IdKYCVerification?: KYCVerificationPK
  IdKYCVerificationFlowStatus: EKYCVerificationFlowStatus
  MetaData?: string
  FlowID?: string
  ResourceID?: string
  ResourceBody?: object
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  //Collections
  KYCVerificationFlowSteps?: IKYCVerificationFlowStep[]
}