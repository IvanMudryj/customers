export interface KYCFlowEntity extends KYCFlowAttributes {
  FlowID: KYCFlowPK
}

export interface KYCFlowPK extends String { }

export interface KYCFlowAttributes {
  Description?: string
  EventsCallbackUrl?: string
  IdentityInfoCallbackUrl?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
