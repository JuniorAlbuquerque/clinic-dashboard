import { GetProfessionals } from '@/graphql/generated/GetProfessionals'
import { ALL_PROFESSIONALS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useAllProfessionals() {
  const { loading, data } = useQuery<GetProfessionals>(ALL_PROFESSIONALS)

  return {
    loading,
    data
  }
}
