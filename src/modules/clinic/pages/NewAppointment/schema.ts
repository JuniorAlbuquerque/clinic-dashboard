import * as z from 'zod'

export const AppointmentSchema = z.object({
  appointment: z.object({
    treatment: z.object(
      {
        id: z.string().or(z.number()),
        name: z.string()
      },
      {
        required_error: 'Campo obrigatório'
      }
    ),
    package: z.object(
      {
        id: z.string().or(z.number()),
        name: z.string(),
        quantity: z.number(),
        value: z.number()
      },
      {
        required_error: 'Campo obrigatório'
      }
    ),
    patient_id: z.number({
      required_error: 'Campo obrigatório'
    }),
    professional_id: z.number({
      required_error: 'Campo obrigatório'
    }),
    description: z.string({
      required_error: 'Camppo obrigatório',
      invalid_type_error: 'Campo obrigatório'
    })
  }),
  schedule: z.object({
    initial_date: z.date({
      required_error: 'Camppo obrigatório',
      invalid_type_error: 'Data inválida'
    }),
    best_hour: z
      .string({
        required_error: 'Camppo obrigatório',
        invalid_type_error: 'Campo obrigatório'
      })
      .min(1, 'Campo obrigatório'),
    weekDays: z
      .object(
        {
          seg: z.boolean(),
          ter: z.boolean(),
          qua: z.boolean(),
          qui: z.boolean(),
          sex: z.boolean(),
          sab: z.boolean()
        },
        {
          required_error: 'Campo obrigatório'
        }
      )
      .refine(
        (obj) => {
          return Object.values(obj).some((value) => value === true)
        },
        {
          message: 'Campo obrigatório'
        }
      ),
    completed_month: z.object(
      {
        id: z.number(),
        name: z.string()
      },
      {
        required_error: 'Campo obrigatório'
      }
    )
  }),
  payment: z.object({
    discount: z.optional(z.number()),
    payment_date: z.optional(z.date()),
    payment_type: z.object(
      {
        id: z.enum(['CREDIT_CARD', 'MONEY']),
        name: z.string()
      },
      {
        required_error: 'Campo obrigatório'
      }
    ),
    payment_status: z.object(
      {
        id: z.enum(['BLOCK', 'PAID', 'PENDING']),
        name: z.string()
      },
      {
        required_error: 'Campo obrigatório'
      }
    )
  })
})
