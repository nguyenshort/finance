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
