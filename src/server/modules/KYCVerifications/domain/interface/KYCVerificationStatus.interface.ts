export interface KYCVerificationStatusEntity {
  IdKYCVerificationStatus: number
  Description?: string
}

export enum KYCVerificationStatusEnum {
  INITIAL = 1,
  READY = 5,
  PROCESSING = 10,  
  VALIDATION_SUCCEED = 20,
  MANUAL_VALIDATION = 21,
  VALIDATION_REJECTED = 99,
  ABANDONED = 98,
}