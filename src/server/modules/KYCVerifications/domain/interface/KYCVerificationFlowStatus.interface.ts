export interface KYCVerificationFlowStatusEntity {
  IdKYCVerificationFlowStatus: number
  Description?: string
}

export enum KYCVerificationFlowStatusEnum {
  STARTED = 1,
  INPUTS_COMPLETED = 3,
  PROCESSING_STEPS = 4,
  FINISHED = 5,
  UPDATED = 6,
  ABANDONED = 9
}