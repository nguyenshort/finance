import { gql } from '#imports'

export const GET_LOGBOOKS = gql`
    query Logbooks($filter: GetLogbooksFilter!) {
        logbooks(filter: $filter) {
            id
            createdAt
            note
            status
            amount
        }
    }
`
