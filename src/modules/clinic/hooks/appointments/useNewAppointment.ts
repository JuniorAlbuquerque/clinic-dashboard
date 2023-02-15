import {
  CreatePatientPackage,
  CreatePatientPackageVariables
} from '@/graphql/generated/CreatePatientPackage'
import { PatientPackageInputData } from '@/graphql/generated/globalTypes'
import { NEW_APPOINTMENT } from '@/graphql/mutations/newappointment'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function useNewAppointment() {
  const navigate = useNavigate()

  const createPatientPacakge = useMutation({
    mutationFn: async (data: PatientPackageInputData) => {
      const response = await graphQLClient.request<
        CreatePatientPackage,
        CreatePatientPackageVariables
      >(NEW_APPOINTMENT, {
        data
      })

      return response
    },
    onSuccess(response) {
      toast(response.createPatientPackage.message, {
        type: 'success'
      })
      queryClient.invalidateQueries(['week-appointments'])
      queryClient.invalidateQueries(['all-appointments'])
      navigate('/schedule')
    }
  })

  return {
    createPatientPacakge
  }
}
