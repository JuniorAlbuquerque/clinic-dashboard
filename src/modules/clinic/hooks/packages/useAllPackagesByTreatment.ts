import { GetPackagesByTreatment } from '@/graphql/generated/GetPackagesByTreatment'
import { ALL_PACKAGES_BY_TREATMENT } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useAllPackagesByTreatment(treatmentId: number) {
  const { loading, data } = useQuery<GetPackagesByTreatment>(
    ALL_PACKAGES_BY_TREATMENT,
    {
      variables: {
        treatmentId: parseInt(treatmentId?.toString())
      },
      skip: !treatmentId
    }
  )

  return {
    loading,
    data
  }
}
