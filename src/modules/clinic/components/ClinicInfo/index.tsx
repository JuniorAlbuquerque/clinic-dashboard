import CardInfo, { VariantType } from '@/components/CardInfo'
import Table from '@/components/Table'
import { useState } from 'react'
import { useGetPatientCountList } from '../../hooks/patient/usePatientQueries'
import { getRows } from './utils'

const ClinicInfo = () => {
  const [selectedCard, setSelectedCard] = useState<VariantType>('patient')

  const { data: patientCountList } = useGetPatientCountList()

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

  const rows = getRows({
    data: patientCountList?.getPatientCountList?.lastPatients
  })

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 w-fit h-56">
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
          count={0}
        />
        <CardInfo
          variant="professional"
          active={selectedCard === 'professional'}
          onSelect={(type) => {
            setSelectedCard(type)
          }}
          count={0}
        />
      </div>

      <div>
        <div className="mt-8 flex flex-col">
          <Table head={head} data={rows} />
        </div>
      </div>
    </div>
  )
}

export default ClinicInfo
