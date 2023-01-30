import { ComboBox } from '@/components/Form/ComboBox'
import { ListBox } from '@/components/Form/ListBox'
import { Text } from '@/components/Text'
import { FC, Fragment } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AppointmentData } from '..'

type AppointmentFormProps = {
  control: Control<AppointmentData>
}

const fakeTreatments = [
  {
    id: 0,
    name: 'Fisioterapia (valor un. R$ 50.00)'
  },
  {
    id: 1,
    name: 'Pilates (valor un. R$ 60.00)'
  }
]

const fakePackages = [
  {
    id: 1,
    name: '1 sessão - Fisioterapia (R$ 50.00)'
  },
  {
    id: 2,
    name: '8 sessões - Fisioterpia (R$ 500.00)'
  }
]

const fakePatients = [
  {
    id: 0,
    name: 'Júnior Albuquerque'
  },
  {
    id: 1,
    name: 'Saúde Batalha'
  }
]

const fakeProfessionals = [
  {
    id: 0,
    name: 'Sabrina Albuquerque'
  },
  {
    id: 1,
    name: 'Profissioanl 1'
  }
]

export const AppointmentForm: FC<AppointmentFormProps> = ({ control }) => {
  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <Text renderAs="h2">Tipo de Atendimento/Pacote</Text>
        <Text renderAs="p" className="text-slate-500 text-sm">
          Informações como tipo de tratamento, quantidade de atendimentos...
        </Text>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Controller
          name="appointment.treatment_id"
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
        />

        <Controller
          name="appointment.package_id"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={fakePackages}
                label="Pacote"
                onChange={onChange}
              />
            )
          }}
        />

        <Controller
          name="appointment.patient_id"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ComboBox
                value={value}
                data={fakePatients}
                label="Paciente"
                onChange={onChange}
              />
            )
          }}
        />

        <Controller
          name="appointment.professional_id"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ComboBox
                value={value}
                data={fakeProfessionals}
                label="Profissional"
                onChange={onChange}
              />
            )
          }}
        />
      </div>
    </Fragment>
  )
}
