import * as z from 'zod'

export const UpdatePaymentSchema = z.object({
  payment_date: z.date({
    required_error: 'Campo obrigatório',
    invalid_type_error: 'Formato inválido'
  }),
  payment_type: z.object(
    {
      id: z.enum(['CREDIT_CARD', 'MONEY']),
      name: z.string()
    },
    {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório'
    }
  ),
  payment_status: z.object(
    {
      id: z.enum(['BLOCK', 'PAID', 'PENDING']),
      name: z.string()
    },
    {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório'
    }
  )
})
