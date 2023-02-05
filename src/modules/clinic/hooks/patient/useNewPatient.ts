import {
  CreatePatient,
  CreatePatientVariables
} from '@/graphql/generated/CreatePatient'
import { NEW_PATIENT } from '@/graphql/mutations/patient'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export function useNewPatient() {
  const [mutationPatient, { loading }] = useMutation<CreatePatient>(NEW_PATIENT)

  const createPatient = useCallback(
    async (data: CreatePatientVariables, onSuccess?: () => void) => {
      await mutationPatient({
        variables: {
          ...data
        },
        onCompleted: () => {
          toast('Paciente cadastrado com sucesso', {
            type: 'success'
          })
          if (onSuccess) {
            onSuccess()
          }
        },
        onError: (error) => {
          toast(error?.message, {
            type: 'error'
          })
        },
        refetchQueries: ['GetPatientCountList']
      })
    },
    [mutationPatient]
  )

  return {
    createPatient,
    loading
  }
}
