import Tooltip from '@/components/Tooltip'
import {
  GetPatientPackageById_getPatientPackageById_appointments,
  GetPatientPackageById_getPatientPackageById_history
} from '@/graphql/generated/GetPatientPackageById'
import { PaymentType } from '@/graphql/generated/globalTypes'
import { CurrencyDollarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

type GetHistoryRowsProps = {
  data: GetPatientPackageById_getPatientPackageById_history[]
  onClickRow?(item: GetPatientPackageById_getPatientPackageById_history): void
}

type GetAppoitmentRowsProps = {
  data: GetPatientPackageById_getPatientPackageById_appointments[]
  onClickRow?(id: number): void
}

export const historyHead = [
  {
    id: 'initial_date',
    label: 'Início'
  },
  {
    id: 'end_date',
    label: 'Término'
  },
  {
    id: 'payment_status',
    label: 'Pgto'
  },
  {
    id: 'payment_date',
    label: 'Data do Pgto'
  },
  {
    id: 'payment_type',
    label: 'Forma de Pagamento'
  },
  {
    id: 'actions',
    label: ''
  }
]

export const appointmentHead = [
  {
    id: 'start_date',
    label: 'Data/Hora Início'
  },
  {
    id: 'end_date',
    label: 'Data/Hora Fim'
  },
  {
    id: 'presence',
    label: 'Status'
  },
  {
    id: 'observations',
    label: 'Anotações'
  }
]

type PaymentTypeKeys = {
  [key in PaymentType]: string
}

const PaymentTypeTranslate: PaymentTypeKeys = {
  CREDIT_CARD: 'Cartão de Crédito',
  MONEY: 'Dinheiro'
}

const translatePresence = {
  PENDING: {
    message: 'Pendente atendimento',
    class: 'bg-gray-100 text-gray-800'
  },
  PATIENT_MISSED: {
    message: 'Paciente faltou',
    class: 'bg-pink-100 text-pink-800'
  },
  CONCLUDED: {
    message: 'Atendimento Finalizado',
    class: 'bg-green-100 text-green-800'
  }
}

const translatePayment = {
  PENDING: {
    message: 'Pendente',
    class: 'bg-gray-100 text-gray-800'
  },
  BLOCK: {
    message: 'Bloqueado',
    class: 'bg-pink-100 text-pink-800'
  },
  PAID: {
    message: 'Pago',
    class: 'bg-green-100 text-green-800'
  }
}

export const getHistoryRows = ({
  data,
  onClickRow
}: GetHistoryRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
    return {
      ...item,
      initial_date: item?.initial_date
        ? format(new Date(item?.initial_date), 'dd/MM/yyyy')
        : '-',
      end_date: item?.initial_date
        ? format(new Date(item?.end_date), 'dd/MM/yyyy')
        : '-',
      payment_date: item?.payment_date
        ? format(new Date(item?.payment_date), 'dd/MM/yyyy')
        : '-',
      payment_status: (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              translatePayment[item?.payment_status!]?.class
            }`}
          >
            {translatePayment[item?.payment_status!]?.message}
          </span>
        </div>
      ),
      payment_type: PaymentTypeTranslate[item?.payment_type] ?? '-',
      actions: (
        <div
          className="w-8 p-2 bg-primary-50 cursor-pointer rounded-md flex items-center"
          id="payment_status"
          onClick={() => onClickRow(item)}
        >
          <CurrencyDollarIcon width={20} className="text-primary-500" />
          <Tooltip anchorSelect={'#payment_status'} place="top">
            Atualizar pagamento
          </Tooltip>
        </div>
      )
    }
  })
}

export const getAppointmentRows = ({
  data
}: GetAppoitmentRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
    return {
      ...item,
      start_date: item?.start_date
        ? format(new Date(item?.start_date), 'dd/MM/yyyy')
        : '-',
      end_date: item?.end_date
        ? format(new Date(item?.end_date), 'dd/MM/yyyy')
        : '-',
      presence: (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              translatePresence[item?.presence!]?.class
            }`}
          >
            {translatePresence[item?.presence!]?.message}
          </span>
        </div>
      ),
      observations: item?.observations ?? '-',
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
