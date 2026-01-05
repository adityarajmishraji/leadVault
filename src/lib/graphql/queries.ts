import { gql } from '@apollo/client'

export const GET_TEST_DATA = gql`
  query GetTestData {
    test_test1 {
      name
      email
      phone
    }
  }
`