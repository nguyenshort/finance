import { gql } from '#imports'

export const GET_CONTRACT_INFO = gql`
  query GetContractInfo {
      me {
          id
          info {
              id
              name
              cccd
          }
          loan {
              id
              createdAt
              amount
              interest
              signature
              months
          }
      }
  }
`
