import { FC, InputHTMLAttributes, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input: FC<InputProps> = ({ label, ...rest }) => {
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
        <input
          id={currentId}
          className="py-2 pl-3 pr-10block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...rest}
        />
      </div>
    </div>
  )
}
