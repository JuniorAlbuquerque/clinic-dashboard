import clsx from 'clsx'
import {
  FC,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useId
} from 'react'
import { useMask, MaskProps } from 'mask-hooks'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  maskOptions?: MaskProps
}

export const InputMask: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, disabled, error, className, maskOptions, ...rest }, ref) => {
  const currentId = useId()

  const mask = useMask({
    masks: ['@'],
    infinity: true,
    ...maskOptions
  })

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (mask) {
        const value = mask(event.currentTarget.value)

        event.currentTarget.value = value

        return event
      }

      return event
    },
    [mask]
  )

  return (
    <div className={className}>
      <label
        htmlFor={currentId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={currentId}
          className={clsx(
            'py-2 pl-3 pr-10block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm',
            {
              'bg-gray-100': disabled
            }
          )}
          disabled={disabled}
          {...rest}
          ref={ref}
          onKeyUp={handleKeyUp}
        />
      </div>

      {!!error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
})
