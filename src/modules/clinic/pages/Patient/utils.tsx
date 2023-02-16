import { GetPatientCountList_getPatientCountList_lastPatients } from '@/graphql/generated/GetPatientCountList'
import { calculateAge } from '@/utils/calculateAge'
import { brStringToDate } from '@/utils/formats/date'
import { PencilIcon } from '@heroicons/react/24/outline'

type GetRowsProps = {
  data: GetPatientCountList_getPatientCountList_lastPatients[]
  onEditPatient(id: number): void
}

export const heads = [
  {
    id: 'name',
    label: 'Nome'
  },
  {
    id: 'birthdate',
    label: 'Idade'
  },
  {
    id: 'patients_packages',
    label: 'Pacote'
  },
  {
    id: 'telephone',
    label: 'Telefone'
  },
  {
    id: 'edit',
    label: ''
  }
]

export const getRows = ({
  data,
  onEditPatient
}: GetRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
    const { birthdate, patients_packages, ...rest } = item

    return {
      birthdate: calculateAge(brStringToDate(birthdate)),
      patients_packages:
        patients_packages?.length > 0
          ? patients_packages[0]?.package?.treatment?.name
          : '-',
      ...rest,
      edit: (
        <div
          className="w-8 p-2 bg-primary-50 cursor-pointer rounded-md flex items-center"
          onClick={() => onEditPatient(rest?.id)}
        >
          <PencilIcon width={20} className="text-primary-500" />
        </div>
      )
    }
  })
}
