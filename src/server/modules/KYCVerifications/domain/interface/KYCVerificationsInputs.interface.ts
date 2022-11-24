import { V4UUID } from "../../interfaces/FlowMetadata.interface";

export interface KYCVerificationsInputsAttributes {
  IdKYCVerificationInput?: number
  IdKYCVerification?: V4UUID
  InputType?: string
  Value?: string
  MetaData?: object
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}