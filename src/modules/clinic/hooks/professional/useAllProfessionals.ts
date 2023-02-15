import { GetProfessionals } from '@/graphql/generated/GetProfessionals'
import { ALL_PROFESSIONALS } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllProfessionals() {
  const { data, isLoading } = useQuery(['get-professionals'], async () => {
    const response = await graphQLClient.request<GetProfessionals>(
      ALL_PROFESSIONALS
    )

    return response
  })

  return {
    data,
    loading: isLoading
  }
}
