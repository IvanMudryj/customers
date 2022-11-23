export interface FlowMetadata {
  flowId: string;
  metadata: IdKYCVerification;
}

interface IdKYCVerification {
  IdKYCVerification: V4UUID;
}

import { v4 as uuid } from 'uuid';
export class V4UUID {
    public static getRandom() {
      return uuid();
    };
}

export interface Metamap_InitResponse {
  identity: string;
  expired: boolean;
}