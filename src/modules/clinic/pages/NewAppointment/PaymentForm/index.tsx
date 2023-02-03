import { Input } from '@/components/Form/Input'
import { Text } from '@/components/Text'
import { formatCurrency } from '@/utils/formats/currency'
import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import { Control, Controller, UseFormWatch } from 'react-hook-form'
import { AppointmentData } from '..'

type PaymentFormProps = {
  control: Control<AppointmentData>
  watch: UseFormWatch<AppointmentData>
}

export const PaymentForm: FC<PaymentFormProps> = ({ control, watch }) => {
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
                label="Desconto"
                type="number"
                name={name}
                value={value}
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
        {/* <Controller
          name="appointment.treatment"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={fakeTreatments}
                label="Tipo de Tratamento"
                onChange={onChange}
              />
            )
          }}
        /> */}
      </div>
    </Fragment>
  )
}
