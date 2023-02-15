import { GetAllTreatments } from '@/graphql/generated/GetAllTreatments'
import { ALL_TREATMENTS } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllTreatments() {
  const { data, isLoading } = useQuery(['get-all-treatments'], async () => {
    const response = await graphQLClient.request<GetAllTreatments>(
      ALL_TREATMENTS
    )

    return response
  })

  return {
    data,
    loading: isLoading
  }
}
