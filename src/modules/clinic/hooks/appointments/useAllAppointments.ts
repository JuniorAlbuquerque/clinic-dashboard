import { GetAllAppointments } from '@/graphql/generated/GetAllAppointments'
import { ALL_APPOINTMENTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useAllAppointments() {
  const { loading, data } = useQuery<GetAllAppointments>(ALL_APPOINTMENTS)

  return {
    loading,
    data
  }
}
