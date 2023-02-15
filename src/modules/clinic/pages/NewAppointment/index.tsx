import BreadCrumb from '@/components/BreadCrumb'
import Button from '@/components/Button/Button'
import PageContainer from '@/styles/Layout/PageContainer'
import { useForm } from 'react-hook-form'
import { AppointmentForm } from './AppointmentForm'
import { PaymentForm } from './PaymentForm'
import { ScheduleForm } from './ScheduleForm'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AppointmentSchema } from './schema'
import { useNewAppointment } from '../../hooks/appointments/useNewAppointment'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { PaymentStatus, PaymentType } from '@/graphql/generated/globalTypes'

export type AppointmentData = z.infer<typeof AppointmentSchema>

const NewAppointment = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AppointmentData>({
    resolver: zodResolver(AppointmentSchema)
  })

  const { user } = useAuth()

  const { createPatientPacakge } = useNewAppointment()

  const onSubmit = (data: AppointmentData) => {
    createPatientPacakge.mutate({
      appointment: {
        package_id: parseInt(data?.appointment?.package?.id?.toString()),
        patient_id: data?.appointment?.patient_id,
        professional_id: data?.appointment?.professional_id,
        description: data?.appointment?.description!,
        created_by: parseInt(user?.id)
      },
      schedule: {
        initial_date: data?.schedule?.initial_date,
        appointment_days: data?.schedule?.apppointmend_days?.map((date) => ({
          start_date: date.initial_date,
          end_date: date?.end_date
        }))
      },
      payment: {
        discount: data?.payment?.discount ? data?.payment?.discount : 0,
        payment_status: data?.payment?.payment_status?.id as PaymentStatus,
        payment_type: data?.payment?.payment_type?.id as PaymentType,
        payment_date: data?.payment?.payment_date,
        payment_schedule: false
      }
    })
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

          <Button
            busy={createPatientPacakge?.isLoading}
            className="px-10"
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <AppointmentForm control={control} errors={errors} watch={watch} />
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <ScheduleForm
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        </div>

        <div className="bg-white p-4 h-fit w-full rounded-lg">
          <PaymentForm control={control} errors={errors} watch={watch} />
        </div>
      </div>
    </PageContainer>
  )
}

export default NewAppointment
