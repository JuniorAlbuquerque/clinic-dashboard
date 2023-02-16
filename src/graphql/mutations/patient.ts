import { gql } from 'graphql-request'

export const NEW_PATIENT = gql`
  mutation CreatePatient($data: PatientInputData!) {
    createPatient(data: $data) {
      id
      email
    }
  }
`

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($data: PatientUpdateInputData!) {
    updatePatient(data: $data) {
      message
    }
  }
`
