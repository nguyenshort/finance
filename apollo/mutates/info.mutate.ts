import { gql } from '#imports'

export const CREATE_INFO = gql`
  ${INFO_DOC}
  mutation CreateInfo($input: CreateInfoInput!) {
    createInfo(input: $input) {
        id
        name
    }
  }
`
