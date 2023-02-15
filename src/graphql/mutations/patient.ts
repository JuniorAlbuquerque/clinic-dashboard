import { gql } from 'graphql-request'

export const NEW_PATIENT = gql`
  mutation CreatePatient($data: PatientInputData!) {
    createPatient(data: $data) {
      id
      email
    }
  }
`
