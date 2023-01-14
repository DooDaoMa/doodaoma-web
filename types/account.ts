export type LoginPayloadProps = {
  username: string
  password: string
}

export type AuthTokenPayloadProps = {
  authToken: string
}

export type AccountId = string
export type DisplayImage = {
  imageType: string
  baseUrl: string
  type: string
  urls: {
    content160w: string | null
    cover80w80h: string | null
    original: string | null
  }
}

export type BaseUserProps = {
  email: string
  name: string
  roleId: string
  displayImage: DisplayImage | null
  status?: string
}

export type UserProps = BaseUserProps & {
  id: string
  createdAt: string
  suspendedAt: string | null
  updatedAt: string
}

export type AccountProps = BaseUserProps & {
  password?: string
}

export interface AuthContextProps {
  user: UserProps | null
}