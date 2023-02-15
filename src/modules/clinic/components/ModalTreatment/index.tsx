import Button from '@/components/Button/Button'
import { CurrencyInput } from '@/components/Form/CurrencyInput'
import { Input } from '@/components/Form/Input'
import Modal from '@/components/Modal'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { TreatmentSchema } from '../../pages/Settings/schema'
import * as z from 'zod'
import clsx from 'clsx'
import { useNewTreatment } from '../../hooks/treatments/useNewTreatment'

type ModalTreatmentProps = {
  open: boolean
  onClose(): void
}

type TreatmentCreate = z.infer<typeof TreatmentSchema>

const ModalTreatment: FC<ModalTreatmentProps> = ({ open, onClose }) => {
  const {
    control,
    formState: { errors },
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Adicionar novo tratamento"
      onSubmit={handleSubmit(onSubmit)}
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

            <Button
              type="button"
              className="h-6 text-sm"
              onClick={() => append({ quantity: 1, value: null })}
            >
              + Adicionar pacote
            </Button>
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
                          onValueChange={(value) => {
                            onChange(value)
                          }}
                          error={errors?.packages?.[index]?.value?.message}
                        />
                      )
                    }}
                  />

                  {index > 0 && (
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
