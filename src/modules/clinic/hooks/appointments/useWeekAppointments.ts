import {
  GetWeekAppointments,
  GetWeekAppointmentsVariables
} from '@/graphql/generated/GetWeekAppointments'
import { WEEK_APPOINTMENTS } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useWeekAppointments(
  userId: number,
  initial_date: string,
  end_date: string
) {
  const { data, isLoading } = useQuery(
    ['week-appointments', userId, initial_date, end_date],
    async () => {
      const response = await graphQLClient.request<
        GetWeekAppointments,
        GetWeekAppointmentsVariables
      >(WEEK_APPOINTMENTS, {
        userId,
        initialDate: initial_date,
        endDate: end_date
      })

      return response
    }
  )

  return {
    loading: isLoading,
    data
  }
}
