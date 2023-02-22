import { GetAllPatientPackageList_getAllPatientPackageList_data } from '@/graphql/generated/GetAllPatientPackageList'
import { EyeIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

type GetRowsProps = {
  data: GetAllPatientPackageList_getAllPatientPackageList_data[]
  onClickRow?(id: number): void
}

export const heads = [
  {
    id: 'patient',
    label: 'Paciente'
  },
  {
    id: 'treatment',
    label: 'Tratamento'
  },
  {
    id: 'package',
    label: 'Pacote'
  },
  {
    id: 'professional',
    label: 'Profissional'
  },
  {
    id: 'start_date',
    label: 'Data Início'
  },
  {
    id: 'end_date',
    label: 'Data Término'
  },
  {
    id: 'actions',
    label: ''
  }
]

export const getRows = ({ data }: GetRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
    return {
      patient: item?.patient,
      treatment: item?.treatment,
      package: `${item?.package} sessões`,
      professional: item?.professional,
      start_date: format(new Date(item?.start_date), 'dd/MM/yyyy'),
      end_date: format(new Date(item?.end_date), 'dd/MM/yyyy'),
      actions: (
        <Link
          className="w-8 p-2 bg-primary-50 cursor-pointer rounded-md flex items-center"
          to={`/packages/${item?.id}`}
        >
          <EyeIcon width={20} className="text-primary-500" />
        </Link>
      )
    }
  })
}
