import CardInfo, { VariantType } from '@/components/CardInfo'
import Table from '@/components/Table'
import { useState } from 'react'
import { useAllAppointments } from '../../hooks/appointments/useAllAppointments'
import { useGetPatientCountList } from '../../hooks/patient/usePatientQueries'
import { useGetProfessionalCountList } from '../../hooks/professional/useCountProfessional'
import { getAppoitmentRows, getRows } from './utils'

const head = [
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
  }
]

const headProfessionals = [
  {
    id: 'name',
    label: 'Nome'
  },
  {
    id: 'email',
    label: 'Email'
  }
]

const headAppointments = [
  {
    id: 'patient',
    label: 'Paciente'
  },
  {
    id: 'start_date',
    label: 'Início'
  },
  {
    id: 'end_date',
    label: 'Fim'
  },
  {
    id: 'treatment',
    label: 'Tratamento'
  },
  {
    id: 'professional',
    label: 'Profissional'
  },
  {
    id: 'presence',
    label: 'Status'
  }
]

const ClinicInfo = () => {
  const [selectedCard, setSelectedCard] = useState<VariantType>('patient')

  const { data: patientCountList } = useGetPatientCountList()
  const { data: appointments } = useAllAppointments()
  const { data: professionals } = useGetProfessionalCountList()

  const rows = getRows({
    data: patientCountList?.getPatientCountList?.lastPatients
  })

  const appointmentRows = getAppoitmentRows({
    data: appointments?.getAllAppointments
  })

  const currentTable = {
    patient: <Table head={head} data={rows} />,
    appointment: <Table head={headAppointments} data={appointmentRows} />,
    professional: (
      <Table
        head={headProfessionals}
        data={professionals?.getProfessionalCountList.professionalList}
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-fit">
        <CardInfo
          variant="patient"
          active={selectedCard === 'patient'}
          onSelect={(type) => {
            setSelectedCard(type)
          }}
          count={patientCountList?.getPatientCountList?.count || 0}
        />
        <CardInfo
          variant="appointment"
          active={selectedCard === 'appointment'}
          onSelect={(type) => {
            setSelectedCard(type)
          }}
          count={appointments?.getAllAppointments?.length || 0}
        />
        <CardInfo
          variant="professional"
          active={selectedCard === 'professional'}
          onSelect={(type) => {
            setSelectedCard(type)
          }}
          count={professionals?.getProfessionalCountList?.count || 0}
        />
      </div>

      <div>
        <div className="mt-8 flex flex-col">{currentTable[selectedCard!]}</div>
      </div>
    </div>
  )
}

export default ClinicInfo
