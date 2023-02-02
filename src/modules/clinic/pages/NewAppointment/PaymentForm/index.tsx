import { Input } from '@/components/Form/Input'
import { Text } from '@/components/Text'
import { FC, Fragment } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AppointmentData } from '..'

type PaymentFormProps = {
  control: Control<AppointmentData>
}

export const PaymentForm: FC<PaymentFormProps> = ({ control }) => {
  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <Text renderAs="h2">Pagamento</Text>
        <Text renderAs="p" className="text-slate-500 text-sm">
          Aqui você pode cadastrar as informações do pagamento
        </Text>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Input label="Valor total (valor tratamento * pacote)" disabled />
        <Input label="Desconto" type="number" />
        <Input label="Valor total (com desconto)" disabled />
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
