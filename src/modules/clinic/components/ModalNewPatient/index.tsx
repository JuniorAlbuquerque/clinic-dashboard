import { Input } from '@/components/Form/Input'
import { InputMask } from '@/components/Form/InputMask'
import Modal from '@/components/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NewPatientSchema } from '../../pages/Patient/schema'
import * as z from 'zod'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useNewPatient } from '../../hooks/patient/useNewPatient'
import { usePatientById } from '../../hooks/patient/usePatientById'
import { useUpdatePatient } from '../../hooks/patient/useUpdatePatient'

type ModalNewPatientProps = {
  open: boolean
  patient_id?: number
  onClose(): void
}

type NewPatient = z.infer<typeof NewPatientSchema>

const ModalNewPatient: FC<ModalNewPatientProps> = ({
  open,
  patient_id,
  onClose
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<NewPatient>({
    resolver: zodResolver(NewPatientSchema)
  })

  const { user } = useAuth()
  const { createPatient } = useNewPatient()
  const { updatePatient } = useUpdatePatient()

  const { data: patient } = usePatientById(patient_id)

  const modalTitle =
    patient_id && patient?.getPatientById ? 'Editar paciente' : 'Novo paciente'

  const onSubmit = (data: NewPatient) => {
    if (patient_id && patient?.getPatientById) {
      updatePatient.mutate(
        {
          data: {
            id: patient?.getPatientById?.id,
            weight: data?.weight ? parseFloat(data?.weight?.toString()) : 0,
            height: data?.height ? parseFloat(data?.height?.toString()) : 0,
            name: data?.name,
            address: data?.address,
            birthdate: data?.birthdate,
            cpf: data?.cpf,
            telephone: data?.telephone,
            city: data?.city || '',
            email: data?.email,
            clinic_id: parseInt(user?.clinic_id)
          }
        },
        {
          onSuccess() {
            onClose()
            reset()
          }
        }
      )

      return
    }

    createPatient.mutate(
      {
        data: {
          weight: data?.weight ? parseFloat(data?.weight?.toString()) : 0,
          height: data?.height ? parseFloat(data?.height?.toString()) : 0,
          name: data?.name,
          address: data?.address,
          birthdate: data?.birthdate,
          cpf: data?.cpf,
          telephone: data?.telephone,
          city: data?.city || '',
          email: data?.email,
          clinic_id: parseInt(user?.clinic_id)
        }
      },
      {
        onSuccess() {
          onClose()
          reset()
        }
      }
    )
  }

  useEffect(() => {
    if (patient_id && patient?.getPatientById) {
      const patientData = patient?.getPatientById

      reset({
        address: patientData?.address,
        birthdate: patientData?.birthdate,
        city: patientData?.city,
        cpf: patientData?.cpf,
        email: patientData?.email,
        height: patientData?.height,
        name: patientData?.name,
        telephone: patientData?.telephone,
        weight: patientData?.weight
      })
    }
  }, [patient?.getPatientById, patient_id, reset])

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose()
        reset()
      }}
      title={modalTitle}
      onSubmit={handleSubmit(onSubmit)}
      busy={createPatient?.isLoading || updatePatient?.isLoading}
    >
      <form className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Nome do Paciente*"
                className="col-span-2"
                value={value || ''}
                onChange={onChange}
                error={errors?.name?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="birthdate"
          render={({ field: { value, onChange } }) => {
            return (
              <InputMask
                label="Data de Nascimento*"
                maskOptions={{
                  masks: ['##/##/####'],
                  infinity: false
                }}
                placeholder="dd/mm/yyyy"
                value={value || ''}
                onChange={onChange}
                error={errors?.birthdate?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="telephone"
          render={({ field: { value, onChange } }) => {
            return (
              <InputMask
                label="Celular*"
                maskOptions={{
                  masks: ['(##) # ####-####'],
                  infinity: false
                }}
                placeholder="(99) 9 9999-9999"
                value={value || ''}
                onChange={onChange}
                error={errors?.telephone?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="cpf"
          render={({ field: { value, onChange } }) => {
            return (
              <InputMask
                label="Cpf"
                className="col-span-2"
                maskOptions={{
                  masks: ['###.###.###-##'],
                  infinity: false
                }}
                placeholder="000.000.000-00"
                value={value || ''}
                onChange={onChange}
                error={errors?.cpf?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="E-mail*"
                className="col-span-2"
                placeholder="paciente@mail.com"
                value={value || ''}
                onChange={onChange}
                error={errors?.email?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="weight"
          render={({ field: { value, onChange } }) => {
            return (
              <InputMask
                label="Peso(kg)"
                maskOptions={{
                  masks: ['##.##'],
                  reverse: true,
                  infinity: {
                    add: ',',
                    each: 3
                  }
                }}
                placeholder="00"
                value={value || ''}
                onChange={onChange}
                error={errors?.weight?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="height"
          render={({ field: { value, onChange } }) => {
            return (
              <InputMask
                label="Altura (m)"
                maskOptions={{
                  masks: ['#.##'],
                  reverse: true,
                  infinity: false
                }}
                placeholder="0.00"
                value={value || ''}
                onChange={onChange}
                error={errors?.height?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Endereço*"
                className="col-span-2"
                value={value || ''}
                onChange={onChange}
                error={errors?.address?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Cidade"
                className="col-span-2"
                value={value || ''}
                onChange={onChange}
                error={errors?.city?.message}
              />
            )
          }}
        />
      </form>
    </Modal>
  )
}

export default ModalNewPatient
