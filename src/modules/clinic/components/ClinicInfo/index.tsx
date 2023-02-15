import CardInfo, { VariantType } from '@/components/CardInfo'
import Table from '@/components/Table'
import { useState } from 'react'
import { useAllAppointments } from '../../hooks/appointments/useAllAppointments'
import { useGetPatientCountList } from '../../hooks/patient/usePatientQueries'
import { useGetProfessionalCountList } from '../../hooks/professional/useCountProfessional'
import { getAppoitmentRows, getRows } from './utils'
import ReactPaginate from 'react-paginate'

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

const itemsPerPage = 5

const ClinicInfo = () => {
  const [selectedCard, setSelectedCard] = useState<VariantType>('patient')
  const [page, setPage] = useState(0)

  const { data: patientCountList } = useGetPatientCountList()
  const { data: appointments } = useAllAppointments(page, itemsPerPage)
  const { data: professionals } = useGetProfessionalCountList()

  const rows = getRows({
    data: patientCountList?.getPatientCountList?.lastPatients
  })

  const appointmentRows = getAppoitmentRows({
    data: appointments?.getAllAppointments?.allAppointments
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

  const pageCount = Math.ceil(
    appointments?.getAllAppointments?.count / itemsPerPage
  )

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected)
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
          count={appointments?.getAllAppointments?.count}
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

      <div className="mt-8">
        {currentTable[selectedCard!]}

        {selectedCard === 'appointment' &&
          appointments?.getAllAppointments?.count > 10 && (
            <div className="flex mt-4 justify-end">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                forcePage={page}
                nextLinkClassName="no-underline text-primary-500"
                onPageChange={(event) => handlePageClick(event)}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                previousLinkClassName="no-underline text-primary-500"
                renderOnZeroPageCount={null}
                className="flex no-underline items-center gap-2 p-2 decoration-transparent"
                activeClassName="bg-primary-500"
                containerClassName="bg-primary-700"
                breakLinkClassName="no-underline text-primary-500"
                pageLinkClassName="no-underline text-primary-500 w-10 p-2 flex items-center justify-center"
                activeLinkClassName="text-white"
                pageClassName=" bg-white rounded-md border border-primary-100 "
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default ClinicInfo
