import { GetWeekAppointments } from '@/graphql/generated/GetWeekAppointments'
import { WEEK_APPOINTMENTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useWeekAppointments(
  userId: number,
  initial_date: string,
  end_date: string
) {
  const { loading, data } = useQuery<GetWeekAppointments>(WEEK_APPOINTMENTS, {
    variables: {
      userId: userId,
      initialDate: initial_date,
      endDate: end_date
    }
  })

  return {
    loading,
    data
  }
}
