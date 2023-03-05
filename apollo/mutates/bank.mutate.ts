import { gql } from '#imports'

export const CREATE_BANK = gql`
  mutation CreateBank($input: CreateBankInput!) {
    createBank(input: $input) {
        id
        account
        name
        bank
    }
  }
`
