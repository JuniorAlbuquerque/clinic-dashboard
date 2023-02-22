import { PatientPackageRenovateInputData } from '@/graphql/generated/globalTypes'
import {
  RenovatePatientPackage,
  RenovatePatientPackageVariables
} from '@/graphql/generated/RenovatePatientPackage'
import { RENOVATE_PACKAGE } from '@/graphql/mutations/renovatePackage'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useRenovatePackage() {
  const renovatePackage = useMutation({
    mutationFn: async (data: PatientPackageRenovateInputData) => {
      const response = await graphQLClient.request<
        RenovatePatientPackage,
        RenovatePatientPackageVariables
      >(RENOVATE_PACKAGE, {
        data
      })

      return response
    },
    onSuccess(response) {
      toast(response.renovatePatientPackage.message, {
        type: 'success'
      })
      queryClient.invalidateQueries(['week-appointments'])
      queryClient.invalidateQueries(['all-appointments'])
      queryClient.invalidateQueries(['patient_package_id'])
    }
  })

  return {
    renovatePackage
  }
}
