export interface KYCFlowEntity extends KYCFlowAttributes {
  FlowID: KYCFlowPK
}

export interface KYCFlowPK extends String { }

export interface KYCFlowAttributes {
  Description?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
