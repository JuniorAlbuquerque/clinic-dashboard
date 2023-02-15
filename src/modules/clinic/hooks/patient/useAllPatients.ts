import { SearchPatients } from '@/graphql/generated/SearchPatients'
import { ALL_PATIENTS } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllPatients() {
  const { data, isLoading } = useQuery(['search-patients'], async () => {
    const response = await graphQLClient.request<SearchPatients>(ALL_PATIENTS)

    return response
  })

  return {
    data,
    loading: isLoading
  }
}
