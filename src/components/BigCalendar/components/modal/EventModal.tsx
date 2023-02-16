import { DateTimePicker } from '@/components/DateTimePicker'
import { Input } from '@/components/Form/Input'
import Modal from '@/components/Modal'
import { FC, useEffect, useState } from 'react'
import { CustomEventProps } from '../..'
import { ListBox } from '@/components/Form/ListBox'
import { AppointmentStatus } from '@/graphql/generated/globalTypes'
import Button from '@/components/Button/Button'
import { TextArea } from '@/components/Form/TextArea'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateAppointment } from '@/modules/clinic/hooks/appointments/useUpdateAppointment'

type EventModalProps = {
  open: boolean
  event: CustomEventProps
  onClose(): void
}

type EventUpdateData = {
  id: number
  start_date: Date
  end_date: Date
  observations: string
  presence: {
    id: AppointmentStatus
    name: string
  }
}

const presenceList = [
  {
    id: AppointmentStatus.PENDING,
    name: 'Pendente'
  },
  {
    id: AppointmentStatus.PATIENT_MISSED,
    name: 'Paciente Faltou'
  },
  {
    id: AppointmentStatus.CONCLUDED,
    name: 'Concluído'
  }
]

export const EventModal: FC<EventModalProps> = ({ open, event, onClose }) => {
  const [reschedule, setReschedule] = useState(false)

  const { updateAppointment } = useUpdateAppointment()

  const { control, handleSubmit, reset } = useForm<EventUpdateData>()

  const onSubmit = (data: EventUpdateData) => {
    updateAppointment.mutate(
      {
        id: event?.id,
        start_date: data?.start_date,
        end_date: data?.end_date,
        observations: data?.observations || '',
        presence: data?.presence?.id
      },
      {
        onSuccess() {
          onClose()
        }
      }
    )
  }

  useEffect(() => {
    if (event) {
      console.log(event)
      reset({
        id: event?.id,
        observations: event?.observations,
        presence: event?.presence
          ? presenceList?.find((item) => item?.id === event?.presence)
          : null,
        start_date: event?.start,
        end_date: event?.end
      })
    }
  }, [event, reset])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Atendimento nº ${event?.id}`}
      confirmText="Atualizar"
      onSubmit={handleSubmit(onSubmit)}
      // busy={newTreatment.isLoading}
    >
      <div className="flex flex-col gap-2">
        <Input label="Paciente" defaultValue={event?.patient} disabled />
        <Input
          label="Profissional"
          defaultValue={event?.professional}
          disabled
        />

        <Controller
          control={control}
          name="presence"
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                label="Status do Atendimento"
                value={value}
                data={[
                  {
                    id: AppointmentStatus.PENDING,
                    name: 'Pendente'
                  },
                  {
                    id: AppointmentStatus.PATIENT_MISSED,
                    name: 'Paciente Faltou'
                  },
                  {
                    id: AppointmentStatus.CONCLUDED,
                    name: 'Concluído'
                  }
                ]}
                onChange={(status) => {
                  onChange(status)
                }}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="observations"
          render={({ field: { value, onChange } }) => {
            return (
              <TextArea
                value={value}
                onChange={onChange}
                label="Observações do atendimento"
              />
            )
          }}
        />

        <Button
          className="h-8 mt-2 ml-auto"
          onClick={() => setReschedule((prevState) => !prevState)}
        >
          Reagendar
        </Button>

        <Controller
          control={control}
          name="start_date"
          render={({ field: { value, onChange } }) => {
            return (
              <DateTimePicker
                label="Data e Hora Início"
                value={value}
                disabled={!reschedule}
                onDateChange={onChange}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="end_date"
          render={({ field: { value, onChange } }) => {
            return (
              <DateTimePicker
                label="Data e Hora Fim"
                value={value}
                disabled={!reschedule}
                onDateChange={onChange}
              />
            )
          }}
        />
      </div>
    </Modal>
  )
}
