import { gql } from '#imports'

export const GET_SUPPORTER = gql`
  query GetSupporter {
      me {
          id
          collaborator {
              id
              fanpage
          }
      }
  }
`

export const CHECK_SIGNED = gql`
    query CheckSigned {
        me {
            id
            loan {
                id
                signature
            }
        }
    }
`
