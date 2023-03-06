import {User} from "@firebase/auth";

export interface RegisterData {
    email: string
    password: string
    rePassword: string
}

export type UserMeta = Pick<User, 'uid' | 'displayName' | 'email'> & {
    token: string
    balance: number
    withdrawable: boolean
    withdrawNote: string
}
