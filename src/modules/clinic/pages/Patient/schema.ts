import * as z from 'zod'

export const NewPatientSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .min(1, {
      message: 'Campo obrigatório'
    }),
  email: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail inválido'
    }),
  telephone: z.string({
    required_error: 'Campo obrigatório'
  }),
  cpf: z.optional(
    z.string({
      required_error: 'Campo obrigatório'
    })
  ),
  birthdate: z.string({
    required_error: 'Campo obrigatório'
  }),
  address: z.string({
    required_error: 'Campo obrigatório'
  }),
  weight: z.optional(z.string().or(z.number())),
  height: z.optional(z.string().or(z.number())),
  city: z.optional(z.string())
})
