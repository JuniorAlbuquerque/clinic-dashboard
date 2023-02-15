import {
  GetAllAppointments,
  GetAllAppointmentsVariables
} from '@/graphql/generated/GetAllAppointments'
import { ALL_APPOINTMENTS } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllAppointments(page = 0, itemsPerPage = 0) {
  const { data, isLoading } = useQuery<GetAllAppointments>(
    ['all-appointments', page, itemsPerPage],
    async () => {
      const response = await graphQLClient.request<
        GetAllAppointments,
        GetAllAppointmentsVariables
      >(ALL_APPOINTMENTS, {
        itemsPerPage,
        page
      })

      return response
    }
  )

  return {
    loading: isLoading,
    data
  }
}
