import { Calendar } from 'react-big-calendar'
import { format, isToday, isBefore } from 'date-fns'
import pt from 'date-fns/locale/pt/index'
import { useCallback, useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { classNames } from '@/utils/mergeClassName'
import { useAllAppointments } from '@/modules/clinic/hooks/appointments/useAllAppointments'
import {
  CustomEventAgenda,
  CustomEventMonth,
  CustomEventWeek,
  CustomToolbar
} from './components/custom'
import { capitalizeFirstLetter, localizerOptions } from './components/config'
import { EventModal } from './components/modal/EventModal'
import { AppointmentStatus } from '@/graphql/generated/globalTypes'

export type CustomEventProps = {
  id?: number
  start: Date
  end: Date
  title: string
  desc?: string
  presence?: AppointmentStatus
  observations?: string
  patient?: string
  professional?: string
}

const BigCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CustomEventProps>(null)
  const [events, setEvents] = useState<CustomEventProps[]>([])
  const [openEventModal, setOpenEventModal] = useState(false)

  const { data } = useAllAppointments()

  const handleSelectEvent = useCallback((event: CustomEventProps) => {
    setSelectedEvent(event)
    setOpenEventModal(true)
  }, [])

  useEffect(() => {
    if (data?.getAllAppointments?.allAppointments?.length) {
      const newEvents: CustomEventProps[] =
        data?.getAllAppointments?.allAppointments?.map((appointment) => ({
          start: new Date(appointment.start_date),
          end: new Date(appointment.end_date),
          title: appointment.treatment,
          desc: appointment.patient,
          id: appointment?.id,
          presence: appointment?.presence,
          observations: appointment?.observations,
          patient: appointment?.patient,
          professional: appointment?.professional
        }))
      setEvents(newEvents)
    }
  }, [data])

  return (
    <div className="w-full bg-white p-2 rounded-md">
      <Calendar
        localizer={localizerOptions}
        events={events}
        selected={selectedEvent}
        onSelectEvent={handleSelectEvent}
        style={{ height: 'calc(100vh - 164px)' }}
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

      <EventModal
        open={openEventModal}
        event={selectedEvent}
        onClose={() => setOpenEventModal(false)}
      />
    </div>
  )
}

export default BigCalendar
