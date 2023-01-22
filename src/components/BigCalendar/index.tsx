import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
  DateRange,
  EventProps,
  ToolbarProps,
  View
} from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, isToday, isBefore } from 'date-fns'
import pt from 'date-fns/locale/pt/index'
import { Fragment, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { classNames } from '@/utils/mergeClassName'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'

type CustomEventProps = {
  start: Date
  end: Date
  title: string
  desc?: string
}

const locales = {
  'pt-BR': pt
}

const events: CustomEventProps[] = [
  {
    start: new Date('2023-01-20T10:00'),
    end: new Date('2023-01-20T11:00'),
    title: 'Pilates',
    desc: 'Saúde Batalha'
  },
  {
    start: new Date('2023-01-21T08:30'),
    end: new Date('2023-01-21T09:20'),
    title: 'Fisioterapia',
    desc: 'Edy Albuquerque'
  }
]

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const teste = {
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

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatHeader(date: Date) {
  return format(date, 'MMMM dd', {
    locale: pt
  })
}

const CustomEventAgenda = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-xs  font-medium mt-1">{event.title}</p>
      <p className="text-xs">{event.desc}</p>
    </span>
  )
}

const CustomEventWeek = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-sm font-medium mt-1">{event.title}</p>
      <p className="text-xs">{event.desc}</p>
    </span>
  )
}

const CustomEventMonth = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-sm font-medium mt-1">{event.title}</p>
    </span>
  )
}

const CustomToolbar = (props: ToolbarProps) => {
  const culturesViews = {
    month: 'Mês',
    day: 'Dia',
    week: 'Semana',
    agenda: 'Agenda'
  }

  const views = Array.from(props.views as string)

  return (
    <div className="flex items-center justify-between pt-3 pb-4 px-2">
      <div className="font-medium text-lg">
        {capitalizeFirstLetter(props.label)}
      </div>
      <div className="hidden md:ml-4 md:flex md:items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch mr-4">
          <button
            type="button"
            onClick={() => props.onNavigate('PREV')}
            className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => props.onNavigate('TODAY')}
            className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
          >
            Hoje
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={() => props.onNavigate('NEXT')}
            className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <Menu as="div" className="relative">
          <Menu.Button
            type="button"
            className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            {culturesViews?.[props.view! as keyof typeof culturesViews]}
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {views?.map((view) => (
                  <Menu.Item key={view}>
                    {() => (
                      <a
                        href="#"
                        onClick={() => props.onView(view as View)}
                        className={classNames(
                          props.view === view
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {culturesViews?.[view! as keyof typeof culturesViews]}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

const BigCalendar = () => {
  const [date, setDate] = useState<{
    start: Date
    end: Date
    title: string
  }>(null)

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <Calendar
        localizer={teste}
        events={events}
        selected={date}
        onSelectEvent={(date) => {
          setDate(date)
        }}
        style={{ height: 'calc(100vh - 168px)' }}
        defaultView="week"
        defaultDate={new Date()}
        step={30}
        min={new Date(1972, 0, 1, 6, 0, 0, 0)}
        culture="pt-BR"
        components={{
          month: {
            event: CustomEventMonth,
            header: (props) => (
              <div className="p-2">
                <span>
                  {capitalizeFirstLetter(
                    format(props.date, 'EEEEEE', {
                      locale: pt
                    })
                  )}
                </span>
              </div>
            )
          },
          toolbar: CustomToolbar,
          week: {
            event: CustomEventWeek,
            header: (date) => {
              return (
                <div className="text-sm flex items-center justify-center mt-2 mb-10 gap-1">
                  <span className="font-normal text-gray-600">
                    {capitalizeFirstLetter(
                      format(date.date, 'EEEEEE', {
                        locale: pt
                      })
                    )}
                  </span>
                  <div
                    className={classNames(
                      'flex items-center justify-center w-8 h-8 text-center rounded-full',
                      isToday(date.date) ? 'bg-primary-500 text-white' : ''
                    )}
                  >
                    <p>
                      {format(date.date, 'dd', {
                        locale: pt
                      })}
                    </p>
                  </div>
                </div>
              )
            }
          },
          day: {
            event: CustomEventWeek
          },
          agenda: {
            event: CustomEventAgenda,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            time: (time: any) => {
              return <div className="text-xs mt-3">{time.label}</div>
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            date: (date: any) => {
              return <div className="text-xs mt-3">{date.label}</div>
            }
          }
        }}
        eventPropGetter={(event) => {
          const isPilates = event.title.toLowerCase().includes('pilates')
          const datePass = isBefore(event.end, new Date())

          const style = {
            border: 0
          }

          if (datePass) {
            return {
              style,
              className:
                'bg-gray-100 shadow-sm hover:bg-gray-200 text-gray-600 group-hover:text-gray-700 rounded-lg'
            }
          }

          if (isPilates) {
            return {
              style,
              className:
                'bg-primary-50 shadow-sm hover:bg-primary-100 text-primary-500 group-hover:text-primary-700 rounded-lg'
            }
          }

          return {
            style,
            className:
              'bg-blue-50 shadow-sm hover:bg-blue-100 text-blue-500 group-hover:text-blue-700 rounded-lg'
          }
        }}
        slotPropGetter={() => {
          return {
            style: {
              minHeight: 50
            }
          }
        }}
        dayPropGetter={(date) => {
          if (isToday(date)) {
            return {
              style: {
                backgroundColor: '#fff',
                color: '#592D6E'
              }
            }
          }
        }}
        messages={{
          today: 'Hoje',
          previous: 'Voltar',
          next: 'Avançar',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          date: 'Data',
          time: 'Hora',
          event: 'Evento',
          showMore: (count) => {
            return `${count} mais`
          }
        }}
      />
    </div>
  )
}

export default BigCalendar
