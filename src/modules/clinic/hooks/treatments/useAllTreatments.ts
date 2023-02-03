import { GetAllTreatments } from '@/graphql/generated/GetAllTreatments'
import { ALL_TREATMENTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useAllTreatments() {
  const { loading, data } = useQuery<GetAllTreatments>(ALL_TREATMENTS)

  return {
    loading,
    data
  }
}
