import { format, setHours, setMinutes } from 'date-fns'
import { differenceInMinutes } from 'date-fns/esm'
import ptBR from 'date-fns/locale/pt-BR'
import { FC, useCallback } from 'react'

const mappedDays = {
  seg: 1,
  ter: 2,
  qua: 3,
  qui: 4,
  sex: 5,
  sab: 6,
  dom: 7
}

export type MappedVariants = 'pilates' | 'fisioterapia' | 'disabled'

export type CalendarEventPros = {
  startDate: Date
  endDate: Date
  step: number
  startHour: number
  hoursLength: number
  description?: string
  variant: MappedVariants
  width: number
  left: number
}

type VariantStyle = {
  [key in MappedVariants]: {
    bg: string
    textHeader: string
    textDescription: string
  }
}

const calcMinuteHeight = (cellHeight: number, step: number) => {
  return Math.ceil(cellHeight) / step
}

const calcCellHeight = (tableHeight: number, hoursLength: number) => {
  return Math.max(tableHeight / hoursLength, 60)
}

const tableHeight = 16

const CalendarEvent: FC<CalendarEventPros> = ({
  hoursLength,
  description,
  startDate,
  startHour,
  variant,
  endDate,
  width,
  left,
  step
}) => {
  const getGridRowStart = useCallback(() => {
    const cellHeight = calcCellHeight(tableHeight, hoursLength)
    const heightByMinutes = calcMinuteHeight(cellHeight, step)

    const minutesFromTop = differenceInMinutes(
      startDate,
      setMinutes(setHours(startDate, startHour), 0)
    )

    const topSpace = minutesFromTop * heightByMinutes
    const slotsFromTop = minutesFromTop / step

    const borderFactor = slotsFromTop + 2

    const rowStart = Math.round(topSpace / 4 + borderFactor)

    return rowStart
  }, [hoursLength, startDate, startHour, step])

  const getGridRowEnd = useCallback(() => {
    const rangeDates = differenceInMinutes(endDate, startDate) / 60

    const rowEnd = rangeDates * tableHeight

    return Math.round(rowEnd)
  }, [endDate, startDate])

  const variantStyle: VariantStyle = {
    pilates: {
      bg: 'bg-primary-50 hover:bg-primary-100',
      textHeader: 'text-primary-600',
      textDescription: 'text-primary-500 group-hover:text-primary-700'
    },
    fisioterapia: {
      bg: 'bg-emerald-50 hover:bg-emerald-100',
      textHeader: 'text-emerald-600',
      textDescription: 'text-emerald-500 group-hover:text-emerald-700'
    },
    disabled: {
      bg: 'bg-gray-50 hover:bg-gray-100',
      textHeader: 'text-gray-600',
      textDescription: 'text-gray-600 group-hover:text-gray-700'
    }
  }

  const classCol = `relative mt-px flex col-start-${mappedDays[
    format(startDate, 'EEEEEE', {
      locale: ptBR
    }) as keyof typeof mappedDays
  ].toString()}`

  return (
    <li
      className={classCol}
      style={{
        gridRow: `${getGridRowStart()} / span ${getGridRowEnd()}`,
        marginLeft: left + '%'
      }}
    >
      <a
        href="#"
        className={`group absolute w-[${width}%] inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-200 scrollbar-track-gray-100 ${
          variantStyle?.[variant!]?.bg
        }`}
      >
        <p
          className={`order-1 font-semibold ${variantStyle[variant]?.textDescription}`}
        >
          {description}
        </p>
        <p className={variantStyle[variant]?.textHeader}>
          <time dateTime="2022-01-12T06:00">
            {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm aa')}
          </time>
        </p>
      </a>
    </li>
  )
}

export default CalendarEvent
