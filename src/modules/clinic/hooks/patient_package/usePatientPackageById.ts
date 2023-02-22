import {
  GetPatientPackageById,
  GetPatientPackageByIdVariables
} from '@/graphql/generated/GetPatientPackageById'
import { PATIENT_PACKAGE_BY_ID } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function usePatientPackageById(id: number) {
  const { data, isLoading } = useQuery<GetPatientPackageById>(
    ['patient_package_id', id],
    async () => {
      const response = await graphQLClient.request<
        GetPatientPackageById,
        GetPatientPackageByIdVariables
      >(PATIENT_PACKAGE_BY_ID, {
        getPatientPackageByIdId: id
      })

      return response
    },
    {
      enabled: !!id
    }
  )

  return {
    loading: isLoading,
    data
  }
}
