import { IKYCVerificationsInputs } from "."
import { V4UUID } from "../../interfaces/FlowMetadata.interface"

export interface KYCVerificationsAttributes {
    IdKYCVerification: V4UUID
    IdKYCVerificationStatus?: number
    Identity?: string
    Request?: object
    Response?: object
    ResponseStatus?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date

    //Collections
    KYCVerificationInputs?: IKYCVerificationsInputs[]
  }