import { CreatePatientPackage } from '@/graphql/generated/CreatePatientPackage'
import { PatientPackageInputData } from '@/graphql/generated/globalTypes'
import { NEW_APPOINTMENT } from '@/graphql/mutations/newappointment'
import { WEEK_APPOINTMENTS } from '@/graphql/queries'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useNewAppointment() {
  const [mutationPatientPackage, { loading }] =
    useMutation<CreatePatientPackage>(NEW_APPOINTMENT)

  const navigate = useNavigate()
  const { user } = useAuth()

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
        },
        refetchQueries: [
          'GetAllAppointments',
          {
            query: WEEK_APPOINTMENTS,
            variables: {
              userId: parseInt(user?.id),
              initialDate: new Date(),
              endDate: new Date()
            }
          }
        ],
        awaitRefetchQueries: true
      })
    },
    [mutationPatientPackage, navigate, user?.id]
  )

  return {
    createPatientPacakge,
    loading
  }
}
