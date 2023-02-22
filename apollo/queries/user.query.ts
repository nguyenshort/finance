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

export const GET_AGREEMENT = gql`
    query GetAgreement {
        me {
            id
            info {
                address
                born
                cccd
                createdAt
                education
                income
                marriage
                name
                id
                job
                purpose
            }
            loan {
                id
                amount
                interest
                months
                signature
                status
            }
            bank {
                id
                bank
                account
                name
            }
            identity {
                id
                front
                back
                avatar
            }
            createdAt
        }
    }
`
