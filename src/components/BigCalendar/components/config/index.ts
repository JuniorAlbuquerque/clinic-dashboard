import { dateFnsLocalizer, DateLocalizer, DateRange } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import pt from 'date-fns/locale/pt/index'

export const locales = {
  'pt-BR': pt
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export const localizerOptions = {
  ...localizer,
  formats: {
    ...localizer.formats,
    dayRangeHeaderFormat: (range: DateRange) => {
      const initial = formatHeader(range.start)
      const end = formatHeader(range.end)

      return `${capitalizeFirstLetter(initial)} - ${capitalizeFirstLetter(end)}`
    }
  }
} as unknown as DateLocalizer

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatHeader(date: Date) {
  return format(date, 'MMMM dd', {
    locale: pt
  })
}
