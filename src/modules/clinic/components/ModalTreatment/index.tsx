import Button from '@/components/Button/Button'
import { CurrencyInput } from '@/components/Form/CurrencyInput'
import { Input } from '@/components/Form/Input'
import Modal from '@/components/Modal'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { TreatmentSchema } from '../../pages/Settings/schema'
import * as z from 'zod'
import clsx from 'clsx'
import { useNewTreatment } from '../../hooks/treatments/useNewTreatment'
import { GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages } from '@/graphql/generated/GetAllTreatmentsWithPackages'

type ModalTreatmentProps = {
  open: boolean
  treatment?: GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages
  onClose(): void
}

type TreatmentCreate = z.infer<typeof TreatmentSchema>

const ModalTreatment: FC<ModalTreatmentProps> = ({
  open,
  treatment,
  onClose
}) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<TreatmentCreate>({
    defaultValues: {
      name: '',
      value: null,
      packages: [
        {
          quantity: 1,
          value: null
        }
      ]
    },
    resolver: zodResolver(TreatmentSchema)
  })

  const isViewOnly = !!treatment?.id

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'packages'
  })

  const { newTreatment } = useNewTreatment()

  const onSubmit = (data: TreatmentCreate) => {
    newTreatment.mutate(
      {
        data: {
          name: data.name,
          value: parseInt(data.value?.toString())
        },
        packages: data.packages?.map((item) => ({
          quantity: parseInt(item.quantity?.toString()),
          value: parseFloat(item?.value?.toString())
        }))
      },
      {
        onSuccess() {
          onClose()
        }
      }
    )
  }

  useEffect(() => {
    if (treatment && treatment?.id) {
      reset({
        name: treatment?.name,
        value: treatment?.value,
        packages: treatment?.Package?.map((item) => ({
          quantity: item?.quantity,
          value: item?.value
        }))
      })
    }
  }, [reset, treatment])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isViewOnly ? treatment?.name : 'Adicionar novo tratamento'}
      confirmText={isViewOnly ? 'Ok' : 'Confirmar'}
      onSubmit={() => {
        if (isViewOnly) {
          onClose()
          return
        }
        handleSubmit(onSubmit)()
      }}
      busy={newTreatment.isLoading}
    >
      <form className="grid grid-cols-2 gap-2">
        <Controller
          control={control}
          name="name"
          render={({ field }) => {
            return (
              <Input
                label="Nome do Tratamento"
                value={field.value}
                onChange={field.onChange}
                disabled={isViewOnly}
                error={errors?.name?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="value"
          render={({ field: { value, onChange } }) => {
            return (
              <CurrencyInput
                label="Valor Un."
                value={value}
                disabled={isViewOnly}
                onValueChange={(value) => {
                  onChange(value)
                }}
                error={errors?.value?.message}
              />
            )
          }}
        />

        <div className="col-span-2 mt-2 p-2 border border-gray-300 rounded-lg">
          <div className="col-span-2 mb-2 flex justify-between items-center">
            <p className="font-medium">Pacotes</p>

            {!isViewOnly && (
              <Button
                type="button"
                className="h-6 text-sm"
                onClick={() => append({ quantity: 1, value: null })}
              >
                + Adicionar pacote
              </Button>
            )}
          </div>

          <hr />

          <div className="flex flex-col gap-2">
            {fields?.map((field, index) => (
              <div className="grid grid-cols-2 gap-2" key={field.id}>
                <Controller
                  control={control}
                  name={`packages.${index}.quantity`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Input
                        label="Quantidade"
                        type="number"
                        value={value}
                        disabled={isViewOnly}
                        onChange={(event) =>
                          onChange(parseInt(event.target.value))
                        }
                        min={1}
                        error={errors?.packages?.[index]?.quantity?.message}
                      />
                    )
                  }}
                />

                <div className="flex gap-2 items-stretch">
                  <Controller
                    control={control}
                    name={`packages.${index}.value`}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <CurrencyInput
                          label="Valor"
                          value={value}
                          disabled={isViewOnly}
                          onValueChange={(value) => {
                            onChange(value)
                          }}
                          error={errors?.packages?.[index]?.value?.message}
                        />
                      )
                    }}
                  />

                  {index > 0 && !isViewOnly && (
                    <button
                      className={clsx('text-red-500', {
                        'mt-6': !errors?.packages?.[index]?.value?.message
                      })}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <XCircleIcon width={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default ModalTreatment
