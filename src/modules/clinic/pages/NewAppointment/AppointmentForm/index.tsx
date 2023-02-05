import { ComboBox } from '@/components/Form/ComboBox'
import { ListBox } from '@/components/Form/ListBox'
import { TextArea } from '@/components/Form/TextArea'
import { Text } from '@/components/Text'
import { useAllPackagesByTreatment } from '@/modules/clinic/hooks/packages/useAllPackagesByTreatment'
import { useAllPatients } from '@/modules/clinic/hooks/patient/useAllPatients'
import { useAllProfessionals } from '@/modules/clinic/hooks/professional/useAllProfessionals'
import { useAllTreatments } from '@/modules/clinic/hooks/treatments/useAllTreatments'
import { FC, Fragment } from 'react'
import { Control, Controller, FormState, UseFormWatch } from 'react-hook-form'
import { AppointmentData } from '..'

type AppointmentFormProps = {
  control: Control<AppointmentData>
  errors?: FormState<AppointmentData>['errors']
  watch?: UseFormWatch<AppointmentData>
}

export const AppointmentForm: FC<AppointmentFormProps> = ({
  control,
  errors,
  watch
}) => {
  const selectedTreatment = watch('appointment.treatment')?.id

  const { data: treatments } = useAllTreatments()
  const { data: packages } = useAllPackagesByTreatment(
    parseInt(selectedTreatment?.toString())
  )
  const { data: allPatients } = useAllPatients()
  const { data: allProfessionals } = useAllProfessionals()

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
          name="appointment.treatment"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={treatments?.getAllTreatments || []}
                label="Tipo de Tratamento"
                onChange={onChange}
                error={errors?.appointment?.treatment?.message}
              />
            )
          }}
        />

        <Controller
          name="appointment.package"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                value={value}
                data={packages?.getPackagesByTreatment || []}
                label="Pacote"
                onChange={onChange}
                disabled={!selectedTreatment}
                error={errors?.appointment?.package?.message}
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
                data={allPatients?.searchPatients || []}
                label="Paciente"
                onChange={onChange}
                error={errors?.appointment?.patient_id?.message}
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
                data={allProfessionals?.getProfessionals || []}
                label="Profissional"
                onChange={onChange}
                error={errors?.appointment?.professional_id?.message}
              />
            )
          }}
        />

        <Controller
          name="appointment.description"
          control={control}
          render={({ field: { name, value, onChange, onBlur } }) => {
            return (
              <TextArea
                label="Descrição/História"
                rootClassName="md:col-span-2"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )
          }}
        />
      </div>
    </Fragment>
  )
}
