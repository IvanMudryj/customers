import { EKYCVerificationStatus, IKYCVerificationInput, IKYCVerificationInputAttributes } from "."
import { V4UUID } from "../../interfaces/FlowMetadata.interface"

export interface KYCVerificationEntity extends KYCVerificationAttributes { 
  IdKYCVerification: KYCVerificationPK
}

export interface KYCVerificationPK extends V4UUID { }

export interface KYCVerificationAttributes {
  IdKYCVerificationStatus?: EKYCVerificationStatus
  Identity?: string
  Request?: object
  Response?: object
  ResponseStatus?: string
  VerificationData?: object
  CallbackConfig?: any
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  //Collections
  KYCVerificationsInputs?: IKYCVerificationInput[]
}
