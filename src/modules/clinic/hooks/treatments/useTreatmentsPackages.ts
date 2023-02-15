import { GetAllTreatmentsWithPackages } from '@/graphql/generated/GetAllTreatmentsWithPackages'
import { TREATMENTS_AND_PACKAGES } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useTreatmentPackages() {
  const { data, isLoading } = useQuery(
    ['get-all-treatments-packages'],
    async () => {
      const response =
        await graphQLClient.request<GetAllTreatmentsWithPackages>(
          TREATMENTS_AND_PACKAGES
        )

      return response
    }
  )

  return {
    data,
    loading: isLoading
  }
}
