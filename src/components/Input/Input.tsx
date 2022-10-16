import { classNames } from '@/utils/mergeClassName'
import { FC, InputHTMLAttributes } from 'react'
import { Text } from '../Text'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input: FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <Text renderAs="span" className="font-medium ml-2">
        {label}
      </Text>

      <input
        {...rest}
        className={classNames(
          'border-2 border-solid border-gray-500 rounded-2xl px-4 py-4',
          rest.className
        )}
      />
    </div>
  )
}

export default Input
