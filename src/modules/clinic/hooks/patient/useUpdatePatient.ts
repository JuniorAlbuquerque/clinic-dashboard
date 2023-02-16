import {
  UpdatePatient,
  UpdatePatientVariables
} from '@/graphql/generated/UpdatePatient'
import { UPDATE_PATIENT } from '@/graphql/mutations/patient'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useUpdatePatient() {
  const updatePatient = useMutation({
    mutationFn: async (data: UpdatePatientVariables) => {
      const response = await graphQLClient.request<
        UpdatePatient,
        UpdatePatientVariables
      >(UPDATE_PATIENT, {
        ...data
      })

      return response
    },
    onSuccess() {
      toast('Informações atualizadas com sucesso', {
        type: 'success'
      })

      queryClient.invalidateQueries(['patient-count-list'])
      queryClient.invalidateQueries(['search-patients'])
    }
  })

  return {
    updatePatient
  }
}
