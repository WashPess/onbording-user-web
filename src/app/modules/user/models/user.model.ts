export interface User {
  uuid: string,
  email: string,
  document: string,
  firstName: string,
  lastName: string,
  fullName: string,
  nickname: string,
  password: string,
  confirmPassword: string,
  optin: boolean,
  status: string,
  createdAt: Date,
  updatedAt: Date
}
