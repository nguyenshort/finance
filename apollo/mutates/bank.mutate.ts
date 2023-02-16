import { gql } from '#imports'

export const CREATE_BANK = gql`
  ${BANK_DOC}
  mutation CreateBank($input: CreateBankInput!) {
    createBank(input: $input) {
      ...BankDoc
    }
  }
`
