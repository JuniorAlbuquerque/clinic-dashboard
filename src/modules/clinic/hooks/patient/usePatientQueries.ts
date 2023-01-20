import { GetPatientCountList } from '@/graphql/generated/GetPatientCountList'
import { PATIENT_LIST_COUNT } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

export function useGetPatientCountList() {
  const { loading, data } = useQuery<GetPatientCountList>(PATIENT_LIST_COUNT)

  return {
    loading,
    data
  }
}
