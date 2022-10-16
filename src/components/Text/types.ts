import { ReactNode } from 'react'

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

export type TextVariant =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'white'

export type VariantMap = {
  [key in TextVariant]: string
}

export type TextProps = {
  renderAs: TextType
  children: ReactNode
  className?: string
  variant?: TextVariant
}
