import { gql } from '#imports'
export const BANK_DOC = gql`
  fragment BankDoc on Bank {
    id
    account
    name
    bank
  }
`

export const GET_BANK = gql`
  query GetBank {
    bank {
        id
        account
        name
        bank
    }
  }
`
