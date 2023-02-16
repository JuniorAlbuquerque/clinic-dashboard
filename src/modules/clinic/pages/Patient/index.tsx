import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import Table from '@/components/Table'
import PageContainer from '@/styles/Layout/PageContainer'
import { useState } from 'react'
import ModalNewPatient from '../../components/ModalNewPatient'
import { useGetPatientCountList } from '../../hooks/patient/usePatientQueries'
import { getRows, heads } from './utils'

const Patient = () => {
  const [openModal, setOpenModal] = useState(false)
  const [patientId, setPatientId] = useState<number>(null)

  const { data: patientCountList } = useGetPatientCountList()

  const handleEditPatient = (id: number) => {
    setPatientId(id)
    setOpenModal(true)
  }

  const rows = getRows({
    data: patientCountList?.getPatientCountList?.lastPatients,
    onEditPatient: handleEditPatient
  })

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 p-8">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Pacientes',
                current: true,
                to: '/patient'
              }
            ]}
          />

          <Button className="px-10" onClick={() => setOpenModal(true)}>
            Novo Paciente
          </Button>
        </div>

        <Table head={heads} data={rows} />

        {openModal && (
          <ModalNewPatient
            open={openModal}
            onClose={() => setOpenModal(false)}
            patient_id={patientId}
          />
        )}
      </div>
    </PageContainer>
  )
}

export default Patient
