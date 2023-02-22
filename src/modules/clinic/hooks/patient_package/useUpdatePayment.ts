import { UpdatePackageHistoryPaymentInputData } from '@/graphql/generated/globalTypes'
import {
  UpdatePackagePayment,
  UpdatePackagePaymentVariables
} from '@/graphql/generated/UpdatePackagePayment'
import { UPDATE_PAYMENT } from '@/graphql/mutations/updatePayment'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useUpdatePayment() {
  const updatePayment = useMutation({
    mutationFn: async (data: UpdatePackageHistoryPaymentInputData) => {
      const response = await graphQLClient.request<
        UpdatePackagePayment,
        UpdatePackagePaymentVariables
      >(UPDATE_PAYMENT, {
        data
      })

      return response
    },
    onSuccess(response) {
      toast(response.updatePackagePayment.message, {
        type: 'success'
      })
      queryClient.invalidateQueries(['week-appointments'])
      queryClient.invalidateQueries(['all-appointments'])
      queryClient.invalidateQueries(['patient_package_id'])
    }
  })

  return {
    updatePayment
  }
}
