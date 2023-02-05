import { DatePicker } from '@/components/DatePicker'
import { Input } from '@/components/Form/Input'
import { ListBox } from '@/components/Form/ListBox'
import { Text } from '@/components/Text'
import { formatCurrency } from '@/utils/formats/currency'
import { FC, Fragment, useEffect, useState } from 'react'
import { Control, Controller, FormState, UseFormWatch } from 'react-hook-form'
import { AppointmentData } from '..'
import { paymentList, paymentStatusList } from '../types'

type PaymentFormProps = {
  control: Control<AppointmentData>
  errors?: FormState<AppointmentData>['errors']
  watch: UseFormWatch<AppointmentData>
}

export const PaymentForm: FC<PaymentFormProps> = ({
  control,
  errors,
  watch
}) => {
  const totalValue = watch('appointment.package')?.value
  const discount = watch('payment.discount')
  const [valueWithDiscount, setValueWithDiscount] = useState(0)

  useEffect(() => {
    if (totalValue) {
      setValueWithDiscount(totalValue)

      if (!discount) {
        setValueWithDiscount(totalValue)
        return
      }

      setValueWithDiscount(totalValue - totalValue * (discount / 100))
    }
  }, [discount, totalValue])

  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <Text renderAs="h2">Pagamento</Text>
        <Text renderAs="p" className="text-slate-500 text-sm">
          Aqui você pode cadastrar as informações do pagamento
        </Text>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Input
          label="Valor total (sem desconto)"
          disabled
          value={totalValue ? formatCurrency(totalValue) : formatCurrency(0)}
        />

        <Controller
          name="payment.discount"
          control={control}
          render={({ field: { name, value, onChange } }) => {
            return (
              <Input
                label="Desconto (%)"
                type="number"
                name={name}
                value={value || ''}
                onChange={(event) => {
                  const discount = event.target.value
                  onChange(parseInt(discount))
                }}
              />
            )
          }}
        />
        <Input
          label="Valor total (com desconto)"
          disabled
          value={formatCurrency(valueWithDiscount) || ''}
        />

        <Controller
          name="payment.payment_status"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={paymentStatusList || []}
                label="Status do pagamento"
                onChange={onChange}
                error={errors?.payment?.payment_status?.message}
              />
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
                label="Date do pagamento"
                value={value}
                onDateChange={onChange}
              />
            )
          }}
        />
      </div>
    </Fragment>
  )
}
