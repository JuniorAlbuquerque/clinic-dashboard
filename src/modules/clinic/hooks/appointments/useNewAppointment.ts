import { CreatePatientPackage } from '@/graphql/generated/CreatePatientPackage'
import { PatientPackageInputData } from '@/graphql/generated/globalTypes'
import { NEW_APPOINTMENT } from '@/graphql/mutations/newappointment'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useNewAppointment() {
  const [mutationPatientPackage, { loading }] =
    useMutation<CreatePatientPackage>(NEW_APPOINTMENT)

  const navigate = useNavigate()

  const createPatientPacakge = useCallback(
    async (data: PatientPackageInputData) => {
      await mutationPatientPackage({
        variables: {
          data
        },
        onCompleted: (response) => {
          toast(response.createPatientPackage.message, {
            type: 'success'
          })

          navigate('/schedule')
        },
        onError: (error) => {
          toast(error?.message, {
            type: 'error'
          })
        }
      })
    },
    [mutationPatientPackage, navigate]
  )

  return {
    createPatientPacakge,
    loading
  }
}
