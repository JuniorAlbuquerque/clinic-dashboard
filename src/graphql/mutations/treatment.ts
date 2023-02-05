import { gql } from '@apollo/client'

export const NEW_TREATMENT = gql`
  mutation CreateTreatment(
    $packages: [PackageTreatmentList!]!
    $data: TreatmentInputData!
  ) {
    createTreatment(packages: $packages, data: $data) {
      id
      name
    }
  }
`
