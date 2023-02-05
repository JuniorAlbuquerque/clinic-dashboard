import {
  CreateTreatment,
  CreateTreatmentVariables
} from '@/graphql/generated/CreateTreatment'
import { NEW_TREATMENT } from '@/graphql/mutations/treatment'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export function useNewTreatment() {
  const [mutationTreatment, { loading }] =
    useMutation<CreateTreatment>(NEW_TREATMENT)

  const newTreatment = useCallback(
    async (data: CreateTreatmentVariables, onSuccess?: () => void) => {
      await mutationTreatment({
        variables: {
          packages: data.packages,
          data: data.data
        },
        onCompleted: () => {
          toast('Tratamento cadastrado com sucesso', {
            type: 'success'
          })
          onSuccess()
        },
        onError: (error) => {
          toast(error?.message, {
            type: 'error'
          })
        },
        refetchQueries: ['GetAllTreatmentsWithPackages']
      })
    },
    [mutationTreatment]
  )

  return {
    newTreatment,
    loading
  }
}
