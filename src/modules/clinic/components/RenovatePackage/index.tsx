import Modal from '@/components/Modal'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RenovatePackageSchema } from './schema'
import * as z from 'zod'
import { DatePicker } from '@/components/DatePicker'
import { Input } from '@/components/Form/Input'
import { GroupDays } from '@/components/GroupDays'
import { ListBox } from '@/components/Form/ListBox'
import {
  paymentList,
  paymentStatusList
} from '../../pages/NewAppointment/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRenovatePackage } from '../../hooks/patient_package/useRenovatePackage'
import {
  PaymentStatus,
  PaymentType,
  WeekDays
} from '@/graphql/generated/globalTypes'

type RenovatePackageProps = {
  open: boolean
  data: {
    minDate: Date
    weekDays: string
    patient_package_id: number
  }
  onClose(): void
}

type RenovatePackageData = z.infer<typeof RenovatePackageSchema>

const days = {
  seg: false,
  ter: false,
  qua: false,
  qui: false,
  sex: false,
  sab: false
}

const RenovatePackage: FC<RenovatePackageProps> = ({ open, data, onClose }) => {
  const {
    formState: { errors },
    reset,
    control,
    handleSubmit
  } = useForm<RenovatePackageData>({
    resolver: zodResolver(RenovatePackageSchema),
    defaultValues: {
      weekDays: days
    }
  })

  const { renovatePackage } = useRenovatePackage()

  const onSubmit = (renovate_data: RenovatePackageData) => {
    renovatePackage.mutate(
      {
        start_date: renovate_data?.initial_date,
        hour: renovate_data?.best_hour,
        weekDays: renovate_data?.weekDays as WeekDays,
        patient_package_id: data?.patient_package_id,
        payment: {
          payment_type: renovate_data?.payment?.payment_type?.id as PaymentType,
          payment_schedule: false,
          payment_status: renovate_data?.payment?.payment_status
            ?.id as PaymentStatus
        }
      },
      {
        onSuccess() {
          reset()
          onClose()
        }
      }
    )
  }

  useEffect(() => {
    if (data) {
      const currentDays = data?.weekDays?.split(',')?.map((day) => day?.trim())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedDays: any = { ...days }

      currentDays?.forEach((day) => {
        selectedDays[day] = true
      })

      reset({
        initial_date: data?.minDate,
        weekDays: selectedDays
      })
    }
  }, [data, reset])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Renovar Pacote"
      confirmText="Renovar"
      onSubmit={() => {
        handleSubmit(onSubmit)()
      }}
      busy={renovatePackage?.isLoading}
    >
      <form className="grid grid-cols-2 gap-3">
        <Controller
          name="initial_date"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <DatePicker
                label="Date de início"
                value={value}
                onDateChange={onChange}
                minDate={data?.minDate}
                error={errors?.initial_date?.message}
              />
            )
          }}
        />

        <Controller
          name="best_hour"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Melhor Horário"
                type="time"
                value={value || ''}
                onChange={(event) => onChange(event.target.value)}
                error={errors?.best_hour?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="weekDays"
          render={({ field: { onChange } }) => {
            return (
              <div className="col-span-2">
                <GroupDays
                  limitDays={data?.weekDays?.split(',')?.length}
                  onChangeDays={(days) => {
                    onChange(days)
                  }}
                  initial_data={data?.weekDays}
                  error={errors?.weekDays?.message}
                />
              </div>
            )
          }}
        />

        <Controller
          name="payment.payment_status"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <div className="col-span-2">
                <ListBox
                  value={value}
                  data={paymentStatusList || []}
                  label="Status do pagamento"
                  onChange={onChange}
                  error={errors?.payment?.payment_status?.message}
                />
              </div>
            )
          }}
        />

        <Controller
          name="payment.payment_type"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={paymentList || []}
                label="Tipo de Pagamento"
                onChange={onChange}
                error={errors?.payment?.payment_type?.message}
              />
            )
          }}
        />

        <Controller
          name="payment.payment_date"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <DatePicker
                label="Data do pagamento"
                value={value}
                onDateChange={onChange}
              />
            )
          }}
        />
      </form>
    </Modal>
  )
}

export default RenovatePackage
