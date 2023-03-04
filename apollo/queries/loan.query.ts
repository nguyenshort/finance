export const VERIFIED_DATA = gql`
    query VerifiedData {
        bank {
            id
            account
            name
            bank
        }
        info {
            id
            name
        }
        identity {
            id
            front
            back
            avatar
        }
    }
`

export const GET_LOAN = gql`
    query GetLoan {
        loan {
            id
            amount
            months
            interest
            status
            signature
            createdAt
        }
    }
`
