export interface VerifyEntityID {
    front: string
    back: string
    avatar: string
}

export interface VerifyEntityInfo {
    name: string
    born: string
    cmnd: string
    job: string
    income: string
    address: string
    education: string
    marriage: string
    perpose: string
}

export interface VerifyBank {
    bank: string
    account: string
    name: string
}

export interface IBank {
    id: number
    code: string
    name: string
    shortName: string
    logo: string
}
