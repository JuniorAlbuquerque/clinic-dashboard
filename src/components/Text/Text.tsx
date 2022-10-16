import { classNames } from '@/utils/mergeClassName'
import { FC } from 'react'
import { TextProps, VariantMap } from './types'

const stylesByType = {
  h1: 'text-2xl font-bold',
  h2: 'text-xl font-semibold',
  h3: 'text-lg font-medium',
  h4: 'text-md',
  p: '',
  span: ''
}

const vartiantStyle: VariantMap = {
  white: 'text-white',
  primary: 'text-primary',
  secondary: 'text-secondary',
  warning: 'text-orange-600',
  danger: 'text-red-600'
}

const Text: FC<TextProps> = ({ renderAs, className, variant, children }) => {
  const TextComponent = renderAs

  return (
    <TextComponent
      className={classNames(
        stylesByType[renderAs],
        className,
        'antialiased',
        vartiantStyle?.[variant]
      )}
    >
      {children}
    </TextComponent>
  )
}

export default Text
