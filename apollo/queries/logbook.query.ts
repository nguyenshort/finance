import { gql } from '#imports'

export const GET_LOGBOOKS = gql`
    query Logbooks {
        logbooks {
            id
            createdAt
            note
            amount
        }
    }
`

export const GET_WITHDRAWS = gql`
    query Withdraws {
        withdraws {
            id
            createdAt
            amount
            status
            updatedAt
        }
    }
`
