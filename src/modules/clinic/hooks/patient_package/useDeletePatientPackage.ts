import {
  DeletePatientPackage,
  DeletePatientPackageVariables
} from '@/graphql/generated/DeletePatientPackage'
import { DELETE_PATIENT_PACKAGE } from '@/graphql/mutations/deletes'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useDeletePatientPackage() {
  const navigate = useNavigate()

  const deletePatientPackage = useMutation({
    mutationFn: async (data: DeletePatientPackageVariables) => {
      const response = await graphQLClient.request<
        DeletePatientPackage,
        DeletePatientPackageVariables
      >(DELETE_PATIENT_PACKAGE, {
        patientPackageId: data?.patientPackageId
      })

      return response
    },
    onSuccess(response) {
      navigate('/packages')

      toast(response.deletePatientPackage.message, {
        type: 'success'
      })

      queryClient.invalidateQueries(['week-appointments'])
      queryClient.invalidateQueries(['all-appointments'])
    }
  })

  return {
    deletePatientPackage
  }
}
