import { GetAllTreatmentsWithPackages } from '@/graphql/generated/GetAllTreatmentsWithPackages'
import { TREATMENTS_AND_PACKAGES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useTreatmentPackages() {
  const { loading, data } = useQuery<GetAllTreatmentsWithPackages>(
    TREATMENTS_AND_PACKAGES
  )

  return {
    loading,
    data
  }
}
