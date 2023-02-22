import {
  GetAllPatientPackageList,
  GetAllPatientPackageListVariables
} from '@/graphql/generated/GetAllPatientPackageList'
import { ALL_PATIENT_PACKAGE_LIST } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function useAllPatientPackageList(page = 0, itemsPerPage = 10) {
  const { data, isLoading } = useQuery<GetAllPatientPackageList>(
    ['all-patient_package', page, itemsPerPage],
    async () => {
      const response = await graphQLClient.request<
        GetAllPatientPackageList,
        GetAllPatientPackageListVariables
      >(ALL_PATIENT_PACKAGE_LIST, {
        itemsPerPage,
        page
      })

      return response
    }
  )

  return {
    loading: isLoading,
    data
  }
}
