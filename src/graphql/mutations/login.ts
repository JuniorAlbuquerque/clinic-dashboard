import { gql } from 'graphql-request'

export const LOGIN = gql`
  mutation Login($data: UserLoginData!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
        clinic_id
      }
    }
  }
`
