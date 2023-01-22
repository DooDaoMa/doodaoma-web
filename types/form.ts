export type ISignUpFormValue = {
  username: string
  email: string
  password: string
  'confirm password': string
}

export type ISignInFormValue = {
  username: string
  password: string
}

export type IFormValue = ISignUpFormValue | ISignInFormValue
