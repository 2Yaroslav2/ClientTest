export interface IUser {
  id : string,
  userName : string,
  email: string,
  role: string
}
export interface IUserRegistrationData {
  userName: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export interface IChangePassword {
  id : string,
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string
}
