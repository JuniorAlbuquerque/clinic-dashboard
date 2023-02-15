import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Text } from '../Text'
import {
  default as ReactDateTimePicker,
  DateTimePickerProps as ReactDateTimePickerProps
} from 'react-datetime-picker'

type DateTimePickerProps = ReactDateTimePickerProps & {
  label?: string
  value?: Date
  error?: string
  onDateChange?(date: Date): void
}

export const DateTimePicker: FC<DateTimePickerProps> = ({
  label,
  value,
  error,
  onDateChange,
  ...rest
}) => {
  const handleChangeDate = (newDate: Date) => {
    if (onDateChange) {
      onDateChange(newDate)
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {!!label && (
        <Text
          renderAs="span"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Text>
      )}

      <ReactDateTimePicker
        className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        onChange={handleChangeDate}
        calendarClassName="custom-calendar"
        value={value}
        format="dd/MM/yyyy HH:mm:ss"
        locale="pt-BR"
        disableClock={true}
        clearIcon={
          <div>
            {value ? <XMarkIcon width={16} className="text-slate-600" /> : null}
          </div>
        }
        calendarIcon={
          <div>
            <CalendarIcon width={16} className="text-slate-600" />
          </div>
        }
        {...rest}
      />

      {!!error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}