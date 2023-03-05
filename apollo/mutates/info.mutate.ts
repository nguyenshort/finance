import { gql } from '#imports'

export const CREATE_INFO = gql`
  mutation CreateInfo($input: CreateInfoInput!) {
    createInfo(input: $input) {
        id
        name
    }
  }
`
