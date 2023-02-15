import { AppointmentUpdateData } from '@/graphql/generated/globalTypes'
import {
  UpdateAppointment,
  UpdateAppointmentVariables
} from '@/graphql/generated/UpdateAppointment'
import { UPDATE_APPOINTMENT } from '@/graphql/mutations/updateAppointment'
import graphQLClient from '@/services/graphql'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useUpdateAppointment() {
  const updateAppointment = useMutation({
    mutationFn: async (data: AppointmentUpdateData) => {
      const response = await graphQLClient.request<
        UpdateAppointment,
        UpdateAppointmentVariables
      >(UPDATE_APPOINTMENT, {
        data
      })

      return response
    },
    onSuccess(response) {
      toast(response.updateAppointment.message, {
        type: 'success'
      })
      queryClient.invalidateQueries(['week-appointments'])
      queryClient.invalidateQueries(['all-appointments'])
    }
  })

  return {
    updateAppointment
  }
}
