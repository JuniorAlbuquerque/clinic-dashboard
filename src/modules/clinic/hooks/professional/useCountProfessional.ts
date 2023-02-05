import { GetProfessionalCountList } from '@/graphql/generated/GetProfessionalCountList'
import { PROFESSIONAL_COUNT } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useGetProfessionalCountList() {
  const { loading, data } =
    useQuery<GetProfessionalCountList>(PROFESSIONAL_COUNT)

  return {
    loading,
    data
  }
}
