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

export interface Metamap_InputResponse {
  result?: boolean;
  error?: {
    type: string,
    code: string
  }
}

export interface Metamap_InitResponse {
  identity: string;
  expired: boolean;
}

export interface Metamap_InputFile {
  inputType: string,
  group?: number,
  data: {
    type: string,
    country?: string,
    page?: string,
    filename: string
  }
}
