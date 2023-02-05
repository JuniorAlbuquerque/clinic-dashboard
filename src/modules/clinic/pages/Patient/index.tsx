import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import Table from '@/components/Table'
import PageContainer from '@/styles/Layout/PageContainer'
import { useState } from 'react'
import { getRows } from '../../components/ClinicInfo/utils'
import ModalNewPatient from '../../components/ModalNewPatient'
import { useGetPatientCountList } from '../../hooks/patient/usePatientQueries'

const Patient = () => {
  const [openModal, setOpenModal] = useState(false)

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

        <Table head={head} data={rows} />

        {openModal && (
          <ModalNewPatient
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        )}
      </div>
    </PageContainer>
  )
}

export default Patient
