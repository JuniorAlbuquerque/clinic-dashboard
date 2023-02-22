import { gql } from 'graphql-request'

export const RENOVATE_PACKAGE = gql`
  mutation RenovatePatientPackage($data: PatientPackageRenovateInputData!) {
    renovatePatientPackage(data: $data) {
      message
    }
  }
`
