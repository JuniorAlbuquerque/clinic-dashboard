import {
  CreateTreatment,
  CreateTreatmentVariables
} from '@/graphql/generated/CreateTreatment'
import { NEW_TREATMENT } from '@/graphql/mutations/treatment'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useNewTreatment() {
  const newTreatment = useMutation({
    mutationFn: async (data: CreateTreatmentVariables) => {
      const response = await graphQLClient.request<
        CreateTreatment,
        CreateTreatmentVariables
      >(NEW_TREATMENT, {
        data: data.data,
        packages: data.packages
      })

      return response
    },
    onSuccess() {
      toast('Tratamento cadastrado com sucesso', {
        type: 'success'
      })

      queryClient.invalidateQueries(['get-all-treatments'])
      queryClient.invalidateQueries(['get-all-treatments-packages'])
    }
  })

  return {
    newTreatment
  }
}
