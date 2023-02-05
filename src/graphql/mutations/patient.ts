import { gql } from '@apollo/client'

export const NEW_PATIENT = gql`
  mutation CreatePatient($data: PatientInputData!) {
    createPatient(data: $data) {
      id
      email
    }
  }
`
