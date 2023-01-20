import BigCalendar from '@/components/BigCalendar'
import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import PageContainer from '@/styles/Layout/PageContainer'
import { FC } from 'react'

const Schedule: FC = () => {
  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl ml-20">
      <div className="flex flex-col gap-4 min-h-screen p-8">
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

          <Button className="px-10">Novo Atendimento / Pacote</Button>
        </div>

        <BigCalendar />
      </div>
    </PageContainer>
  )
}

export default Schedule
