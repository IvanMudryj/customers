import { IKYCVerificationFlowPK } from "."

export interface KYCVerificationFlowStepEntity extends KYCVerificationFlowStepAttributes {
  IdKYCVerificationFlowStep?: KYCVerificationFlowStepPK
}

export interface KYCVerificationFlowStepPK extends Number {}

export interface KYCVerificationFlowStepAttributes {
  IdKYCVerificationFlow?: IKYCVerificationFlowPK
  StepIdentifier?: string
  EventCode?: string
  EventBody?: object
  EventError?: object
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}