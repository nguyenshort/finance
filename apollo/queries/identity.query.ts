import { gql } from '#imports'

export const GET_AVATAR = gql`
  query GetAvatar {
      identity {
          id
          avatar
      }
  }
`
