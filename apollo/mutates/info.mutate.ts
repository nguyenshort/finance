import { gql } from '#imports'

export const UPDATE_INFO = gql`
  mutation UpdateInfo($input: UpdateInfoInput!) {
    updateInfo(input: $input) {
      id
    }
  }
`
