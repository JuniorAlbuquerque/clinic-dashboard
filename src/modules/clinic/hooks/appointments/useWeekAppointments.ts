import { GetWeekAppointments } from '@/graphql/generated/GetWeekAppointments'
import { WEEK_APPOINTMENTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

// $endDate: String!
// $initialDate: String!
// $userId: Float!

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
  // const updateUser = useUserStore((state) => state.updateUser)
  // const updateToken = useUserStore((state) => state.updateToken)

  return {
    loading,
    data
  }
}
