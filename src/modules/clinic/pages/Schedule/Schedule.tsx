import BigCalendar from '@/components/BigCalendar'
import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import PageContainer from '@/styles/Layout/PageContainer'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Schedule: FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 p-8 pb-6">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Agenda',
                current: true,
                to: '/schedule'
              }
            ]}
          />

          <Button
            className="px-10"
            onClick={() => navigate('/schedule/new-appointment')}
          >
            Novo Atendimento / Pacote
          </Button>
        </div>

        <BigCalendar />
      </div>
    </PageContainer>
  )
}

export default Schedule
