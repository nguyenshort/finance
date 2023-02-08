import { gql } from '#imports'

export const UPDATE_BANK = gql`
  mutation UpdateBank($input: UpdateBankInput!) {
    updateBank(input: $input) {
      id
    }
  }
`
