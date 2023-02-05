import { PaymentStatus, PaymentType } from '@/graphql/generated/globalTypes'

export const paymentList = [
  {
    id: PaymentType.CREDIT_CARD,
    name: 'Cartão de Crédito'
  },
  {
    id: PaymentType.MONEY,
    name: 'Dinheiro'
  }
]

export const paymentStatusList = [
  {
    id: PaymentStatus.PENDING,
    name: 'Pagamento Pendente'
  },
  {
    id: PaymentStatus.PAID,
    name: 'Pago'
  }
]
