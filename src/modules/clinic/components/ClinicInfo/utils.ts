import { GetAllAppointments_getAllAppointments } from '@/graphql/generated/GetAllAppointments'
import { GetPatientCountList_getPatientCountList_lastPatients } from '@/graphql/generated/GetPatientCountList'
import { calculateAge } from '@/utils/calculateAge'
import { brStringToDate } from '@/utils/formats/date'
import { format } from 'date-fns'

type GetRowsProps = {
  data: GetPatientCountList_getPatientCountList_lastPatients[]
}

type GetAppointmentRowsProps = {
  data: GetAllAppointments_getAllAppointments[]
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
      PENDING: 'Pendente atendimento',
      PATIENT_MISSED: 'Paciente faltou',
      CONCLUDED: 'Atendimento Finalizado'
    }

    const { patient, start_date, end_date, professional, treatment, presence } =
      item

    return {
      patient,
      start_date: format(new Date(start_date), 'dd/MM/yyyy HH:mm'),
      end_date: format(new Date(end_date), 'dd/MM/yyyy HH:mm'),
      treatment,
      presence: translatePresence[presence!],
      professional
    }
  })
}
