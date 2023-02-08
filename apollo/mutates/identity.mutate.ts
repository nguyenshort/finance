import { gql } from '#imports'

export const UPDATE_IDENTITY = gql`
  mutation UpdateIdentity($input: UpdateIdentityInput!) {
    updateIdentity(input: $input) {
      id
      front
      back
      avatar
    }
  }
`
