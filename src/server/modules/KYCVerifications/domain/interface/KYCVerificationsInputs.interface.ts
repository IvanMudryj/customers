import { IKYCVerificationPK } from ".";

export interface KYCVerificationInputEntity extends KYCVerificationInputAttributes { 
  IdKYCVerificationInput?: KYCVerificationInputPK
}

export interface KYCVerificationInputPK extends Number { }

export interface KYCVerificationInputAttributes {
  IdKYCVerification?: IKYCVerificationPK
  InputType?: string
  Value?: string
  MetaData?: object
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}