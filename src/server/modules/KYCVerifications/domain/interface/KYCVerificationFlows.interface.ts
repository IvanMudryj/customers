import { V4UUID } from "../../interfaces/FlowMetadata.interface";

export interface KYCVerificationFlowsAttributes {
  IdKYCVerificationFlow: number
  IdKYCVerification: V4UUID
  IdKYCVerificationFlowStatus: number
  SessionJWT?: string
  FlowID?: string
  ResourceUrl?: string
  ResourceBody?: object
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}