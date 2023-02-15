import { GetProfessionalCountList } from '@/graphql/generated/GetProfessionalCountList'
import { PROFESSIONAL_COUNT } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useGetProfessionalCountList() {
  const { data, isLoading } = useQuery<GetProfessionalCountList>(
    ['professional-count-list'],
    async () => {
      const response = await graphQLClient.request<GetProfessionalCountList>(
        PROFESSIONAL_COUNT
      )

      return response
    }
  )

  return {
    data,
    loading: isLoading
  }
}
