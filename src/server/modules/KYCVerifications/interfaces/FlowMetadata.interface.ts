import { v4 as uuid } from 'uuid';
import { KYCVerificationPK } from '../domain/interface/KYCVerifications.interface';

export interface FlowMetadata {
  flowId: string
  metadata: MetaData
}

interface MetaData {
  IdKYCVerification: KYCVerificationPK
}

export class V4UUID {
    public static getRandom() {
      return uuid()
    };
}

export interface Metamap_InputResponse {
  result?: boolean
  error?: {
    type: string
    code: string
  }
}

export interface Metamap_InitResponse {
  identity: string
  expired: boolean
  id: string
}

export interface Metamap_InputFile {
  inputType: string
  group?: number
  data: {
    type: string
    country?: string
    page?: string
    filename: string
  }
}

export interface Metamap_HookResponse {
  resource: string
  flowId: string
  eventName: string
  timestamp: string
  step?: any
  metadata?: MetaData
  identityStatus?: string
}

export interface SEP09Fields {
  last_name?: string
  first_name?: string
  additional_name?: string
  address_country_code?: string
  state_or_province?: string
  city?: string
  postal_code?: string
  address?: string
  mobile_number?: string
  email_address?: string
  birth_date?: Date
  birth_place?: string
  birth_country_code?: string
  bank_account_number?: string
  bank_number?: string
  bank_phone_number?: string
  bank_branch_number?: string
  clabe_number?: string
  tax_id?: string
  tax_id_name?: string
  occupation?: number
  employer_name?: string
  employer_address?: string
  language_code?: string
  id_type?: string
  id_country_code?: string
  id_issue_date?: Date
  id_expiration_date?: Date
  id_number?: string
  photo_id_front?: ReferenceBinaryField
  photo_id_back?: ReferenceBinaryField
  notary_approval_of_photo_id?: ReferenceBinaryField
  ip_address?: string
  photo_proof_residence?: ReferenceBinaryField
  sex?: string
  proof_of_income?: ReferenceBinaryField

  //Custom Fields
  photo_selfie?: ReferenceBinaryField
}

export interface ReferenceBinaryField extends String { }