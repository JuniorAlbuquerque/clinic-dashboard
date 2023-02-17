import clsx from 'clsx'
import { FC, InputHTMLAttributes, useId } from 'react'
import CurrencyInputField from 'react-currency-input-field'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  onValueChange?: (value: string, name?: string) => void
}

export const CurrencyInput: FC<InputProps> = ({
  label,
  disabled,
  value,
  error,
  onValueChange,
  onChange
}) => {
  const currentId = useId()

  return (
    <div>
      <label
        htmlFor={currentId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <CurrencyInputField
          decimalScale={2}
          className={clsx(
            'py-2 pl-3 pr-10block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm',
            {
              'bg-gray-100': disabled
            }
          )}
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          placeholder="R$"
          value={value}
          onChange={onChange}
          onValueChange={(value, name) => {
            onValueChange(value, name)
          }}
          id={currentId}
          disabled={disabled}
        />
      </div>

      {!!error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
