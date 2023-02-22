import { DatePicker } from '@/components/DatePicker'
import { ListBox } from '@/components/Form/ListBox'
import Modal from '@/components/Modal'
import { PaymentStatus, PaymentType } from '@/graphql/generated/globalTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { useUpdatePayment } from '../../hooks/patient_package/useUpdatePayment'
import {
  paymentList,
  paymentStatusList
} from '../../pages/NewAppointment/types'
import { UpdatePaymentSchema } from './schema'

type ModalUpdatePaymentProps = {
  open: boolean
  data: {
    package_history_id: number
    payment_date: Date
    payment_status: PaymentStatus
    payment_type: PaymentType
  }
  onClose(): void
}

type UpdatePaymentData = z.infer<typeof UpdatePaymentSchema>

const ModalUpdatePayment: FC<ModalUpdatePaymentProps> = ({
  open,
  data,
  onClose
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<UpdatePaymentData>({
    resolver: zodResolver(UpdatePaymentSchema)
  })

  const { updatePayment } = useUpdatePayment()

  const onSubmit = (payment_data: UpdatePaymentData) => {
    updatePayment.mutate(
      {
        id: data?.package_history_id,
        payment_date: payment_data?.payment_date,
        payment_status: payment_data?.payment_status?.id as PaymentStatus,
        payment_type: payment_data?.payment_type?.id as PaymentType
      },
      {
        onSuccess() {
          onClose()
        }
      }
    )
  }

  useEffect(() => {
    if (data) {
      reset({
        payment_date: data?.payment_date,
        payment_status: data?.payment_status
          ? paymentStatusList?.find((item) => item?.id === data?.payment_status)
          : null,
        payment_type: data?.payment_type
          ? paymentList?.find((item) => item?.id === data?.payment_type)
          : null
      })
    }
  }, [data, reset])

  return (
    <Modal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Atualizar Pagamento"
      confirmText="Atualizar"
      busy={updatePayment?.isLoading}
    >
      <form className="grid grid-cols-1 gap-3">
        <Controller
          name="payment_status"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={paymentStatusList || []}
                label="Status do pagamento"
                onChange={onChange}
                error={errors?.payment_status?.message}
              />
            )
          }}
        />

        <Controller
          name="payment_type"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={paymentList || []}
                label="Tipo de Pagamento"
                onChange={onChange}
                error={errors?.payment_type?.message}
              />
            )
          }}
        />

        <Controller
          name="payment_date"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <DatePicker
                label="Data do pagamento"
                value={value}
                onDateChange={onChange}
                error={errors?.payment_date?.message}
              />
            )
          }}
        />
      </form>
    </Modal>
  )
}

export default ModalUpdatePayment
