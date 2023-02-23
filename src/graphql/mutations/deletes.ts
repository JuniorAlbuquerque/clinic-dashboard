import { gql } from 'graphql-request'

export const DELETE_PATIENT_PACKAGE = gql`
  mutation DeletePatientPackage($patientPackageId: Float!) {
    deletePatientPackage(patient_package_id: $patientPackageId) {
      message
    }
  }
`
