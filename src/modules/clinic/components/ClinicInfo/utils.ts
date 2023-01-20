import { GetPatientCountList_getPatientCountList_lastPatients } from '@/graphql/generated/GetPatientCountList'
import { calculateAge } from '@/utils/calculateAge'
import { brStringToDate } from '@/utils/formats/date'

type GetRowsProps = {
  data: GetPatientCountList_getPatientCountList_lastPatients[]
}

export const getRows = ({ data }: GetRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
    const { birthdate, patients_packages, ...rest } = item

    return {
      birthdate: calculateAge(brStringToDate(birthdate)),
      patients_packages:
        patients_packages?.length > 0
          ? patients_packages[0]?.package?.treatment?.name
          : '-',
      ...rest
    }
  })
}
