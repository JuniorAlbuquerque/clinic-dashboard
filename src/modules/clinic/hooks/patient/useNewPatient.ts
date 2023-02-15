import {
  CreatePatient,
  CreatePatientVariables
} from '@/graphql/generated/CreatePatient'
import { NEW_PATIENT } from '@/graphql/mutations/patient'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useNewPatient() {
  const createPatient = useMutation({
    mutationFn: async (data: CreatePatientVariables) => {
      const response = await graphQLClient.request<
        CreatePatient,
        CreatePatientVariables
      >(NEW_PATIENT, {
        ...data
      })

      return response
    },
    onSuccess() {
      toast('Paciente cadastrado com sucesso', {
        type: 'success'
      })

      queryClient.invalidateQueries(['patient-count-list'])
      queryClient.invalidateQueries(['search-patients'])
    }
  })

  return {
    createPatient
  }
}
