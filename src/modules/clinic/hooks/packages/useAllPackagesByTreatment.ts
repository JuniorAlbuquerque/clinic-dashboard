import {
  GetPackagesByTreatment,
  GetPackagesByTreatmentVariables
} from '@/graphql/generated/GetPackagesByTreatment'
import { ALL_PACKAGES_BY_TREATMENT } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllPackagesByTreatment(treatmentId: number) {
  const { data, isLoading } = useQuery(
    ['packages-by-treatment', treatmentId],
    async () => {
      const response = await graphQLClient.request<
        GetPackagesByTreatment,
        GetPackagesByTreatmentVariables
      >(ALL_PACKAGES_BY_TREATMENT, {
        treatmentId: parseInt(treatmentId?.toString())
      })

      return response
    },
    {
      enabled: !!treatmentId
    }
  )

  return {
    data,
    loading: isLoading
  }
}
