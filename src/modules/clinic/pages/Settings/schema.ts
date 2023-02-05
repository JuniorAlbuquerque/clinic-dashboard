import * as z from 'zod'

export const TreatmentSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório'
    })
    .min(1, {
      message: 'Campo obrigatório'
    }),
  value: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Valor inválido'
    })
    .or(
      z.number({
        required_error: 'Campo obrigatório',
        invalid_type_error: 'Valor inválido'
      })
    ),
  packages: z.array(
    z.object({
      quantity: z
        .number({
          required_error: 'Campo obrigatório',
          invalid_type_error: 'Valor inválido'
        })
        .min(1, {
          message: 'Quantidade não pode ser 0'
        }),
      value: z
        .string({
          required_error: 'Campo obrigatório',
          invalid_type_error: 'Valor inválido'
        })
        .or(
          z.number({
            required_error: 'Campo obrigatório',
            invalid_type_error: 'Valor inválido'
          })
        )
    }),
    {
      required_error: 'Camppo obrigatório'
    }
  )
})
