import { SearchPatients } from '@/graphql/generated/SearchPatients'
import { ALL_PATIENTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useAllPatients() {
  const { loading, data } = useQuery<SearchPatients>(ALL_PATIENTS)

  return {
    loading,
    data
  }
}
