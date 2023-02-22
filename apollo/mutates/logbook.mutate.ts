import { gql } from '#imports'

export const CREATE_WITHDRAW = gql`
    mutation CreateWithdraw($input: CreateWithdrawInput!) {
        createWithdraw(input: $input) {
            id
        }
    }
`