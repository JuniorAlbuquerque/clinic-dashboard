import { gql } from '@apollo/client'

export const NEW_APPOINTMENT = gql`
  mutation CreatePatientPackage($data: PatientPackageInputData!) {
    createPatientPackage(data: $data) {
      message
    }
  }
`
