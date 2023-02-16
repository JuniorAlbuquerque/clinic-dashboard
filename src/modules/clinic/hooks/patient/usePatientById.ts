import {
  GetPatientById,
  GetPatientByIdVariables
} from '@/graphql/generated/GetPatientById'
import { PATIENT_BY_ID } from '@/graphql/queries'
import graphQLClient from '@/services/graphql'
import { useQuery } from '@tanstack/react-query'

export function usePatientById(patient_id: number) {
  const { data, isLoading } = useQuery(
    ['patient', patient_id],
    async () => {
      const response = await graphQLClient.request<
        GetPatientById,
        GetPatientByIdVariables
      >(PATIENT_BY_ID, {
        patientId: patient_id
      })

      return response
    },
    {
      enabled: !!patient_id
    }
  )

  return {
    data,
    isLoading
  }
}
