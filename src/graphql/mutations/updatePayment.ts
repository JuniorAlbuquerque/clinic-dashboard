import { gql } from 'graphql-request'

export const UPDATE_PAYMENT = gql`
  mutation UpdatePackagePayment($data: UpdatePackageHistoryPaymentInputData!) {
    updatePackagePayment(data: $data) {
      message
    }
  }
`
