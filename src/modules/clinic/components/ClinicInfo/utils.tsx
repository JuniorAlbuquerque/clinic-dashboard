import { GetAllAppointments_getAllAppointments } from '@/graphql/generated/GetAllAppointments'
import { GetPatientCountList_getPatientCountList_lastPatients } from '@/graphql/generated/GetPatientCountList'
import { calculateAge } from '@/utils/calculateAge'
import { brStringToDate } from '@/utils/formats/date'
import { format } from 'date-fns'

type GetRowsProps = {
  data: GetPatientCountList_getPatientCountList_lastPatients[]
}

type GetAppointmentRowsProps = {
  data: GetAllAppointments_getAllAppointments['allAppointments']
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

export const getAppoitmentRows = ({
  data
}: GetAppointmentRowsProps): Record<string, unknown>[] => {
  return data?.map((item) => {
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

    const { patient, start_date, end_date, professional, treatment, presence } =
      item

    return {
      patient,
      start_date: format(new Date(start_date), 'dd/MM/yyyy HH:mm'),
      end_date: format(new Date(end_date), 'dd/MM/yyyy HH:mm'),
      treatment,
      presence: (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              translatePresence[presence!]?.class
            }`}
          >
            {translatePresence[presence!]?.message}
          </span>
        </div>
      ),
      professional
    }
  })
}
