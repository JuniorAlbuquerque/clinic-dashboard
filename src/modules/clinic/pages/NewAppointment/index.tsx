import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import PageContainer from '@/styles/Layout/PageContainer'
import { useForm } from 'react-hook-form'
import { AppointmentForm } from './AppointmentForm'
import { ScheduleForm } from './ScheduleForm'

export type AppointmentData = {
  appointment: {
    treatment_id: number
    package_id: number
    patient_id: number
    professional_id: number
  }
  schedule: {
    initial_date: Date
  }
}

const NewAppointment = () => {
  const { handleSubmit, control } = useForm<AppointmentData>({})

  const onSubmit = (data: AppointmentData) => {
    console.log(data)
  }

  return (
    <PageContainer className="bg-primary-50 rounded-l-2xl">
      <div className="flex flex-col gap-4 min-h-screen p-8">
        <div className="bg-white p-4 h-fit w-full rounded-lg flex items-center justify-between">
          <BreadCrumb
            pages={[
              {
                title: 'Agenda',
                current: false,
                to: '/schedule'
              },
              {
                title: 'Novo atendimento',
                current: true,
                to: '/schedule/new-appointment'
              }
            ]}
          />

          <Button className="px-10" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <AppointmentForm control={control} />
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <ScheduleForm control={control} />
        </div>
      </div>
    </PageContainer>
  )
}

export default NewAppointment
