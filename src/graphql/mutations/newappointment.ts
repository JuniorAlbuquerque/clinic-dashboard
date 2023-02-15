import { gql } from 'graphql-request'

export const NEW_APPOINTMENT = gql`
  mutation CreatePatientPackage($data: PatientPackageInputData!) {
    createPatientPackage(data: $data) {
      message
    }
  }
`
