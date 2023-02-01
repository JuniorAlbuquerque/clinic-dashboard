import clsx from 'clsx'
import { FC, TextareaHTMLAttributes, useId } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  rootClassName?: string
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  rootClassName,
  ...rest
}) => {
  const currentId = useId()

  return (
    <div
      className={clsx({
        [rootClassName]: !!rootClassName
      })}
    >
      {!!label && (
        <label
          htmlFor={currentId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="mt-1">
        <textarea
          rows={4}
          id={currentId}
          className={clsx(
            'block w-full py-2 pl-3 pr-8 rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm'
          )}
          {...rest}
        />
      </div>
    </div>
  )
}
