import { GetPatientCountList } from '@/graphql/generated/GetPatientCountList'
import { PATIENT_LIST_COUNT } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useGetPatientCountList() {
  const { data, isLoading } = useQuery<GetPatientCountList>(
    ['patient-count-list'],
    async () => {
      const response = await graphQLClient.request<GetPatientCountList>(
        PATIENT_LIST_COUNT
      )

      return response
    }
  )

  return {
    loading: isLoading,
    data
  }
}
