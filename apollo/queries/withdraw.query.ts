import { gql } from '#imports'

export const GET_WITHDRAWS = gql`
    query GetWithdraws($filter: GetWithdrawsFilter!) {
        withdraws(filter: $filter) {
            id
            createdAt
            note
            status
            amount
        }
    }
`
