export interface Enterprise {
  id: string,
  uuid: string,
  company: string,
  timezone: string,
  address: string,
  cnpj: string,
  corporateReason: string,
  communicationChannel: string[],
  optin: boolean,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

