export interface KYCVerificationStatusEntity {
  IdKYCVerificationStatus: number
  Description?: string
}

export enum KYCVerificationStatusEnum {
  INITIAL = 1,
  INCOMPLETE = 2,
  READY = 3,
  PROCESSING = 10,
  VALIDATING = 15,
  VALIDATION_SUCCEED = 20,
  MANUAL_VALIDATION = 21,
  VALIDATION_REJECTED = 99,
  ABANDONED = 98,
}