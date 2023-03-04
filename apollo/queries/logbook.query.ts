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
