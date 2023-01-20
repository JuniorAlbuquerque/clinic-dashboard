import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@/utils/mergeClassName'
import {
  addDays,
  addWeeks,
  differenceInDays,
  eachMinuteOfInterval,
  endOfDay,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  setHours,
  setMinutes,
  startOfDay,
  startOfWeek,
  subWeeks
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { capitalizeFirstLetter } from '@/utils/autocapitalize'
import CalendarEvent, { MappedVariants } from '../CalendarEvent'

type Event = {
  startDate: Date
  endDate: Date
  description: string
  variant: string
}

const allEvents = [
  {
    startDate: new Date('2022-11-30T08:00'),
    endDate: new Date('2022-11-30T08:45'),
    description: 'Pilates',
    variant: 'disabled'
  },
  {
    startDate: new Date('2022-12-01T08:00'),
    endDate: new Date('2022-12-01T08:45'),
    description: 'Pilates',
    variant: 'pilates'
  },
  {
    startDate: new Date('2022-12-01T08:50'),
    endDate: new Date('2022-12-01T09:45'),
    description: 'Pilates',
    variant: 'pilates'
  },
  {
    startDate: new Date('2022-12-01T10:00'),
    endDate: new Date('2022-12-01T11:00'),
    description: 'Fisioterapia',
    variant: 'fisioterapia'
  },
  {
    startDate: new Date('2022-12-06T09:00'),
    endDate: new Date('2022-12-06T10:00'),
    description: 'Pilates',
    variant: 'pilates'
  }
]

export const differenceInDaysOmitTime = (start: Date, end: Date) => {
  return differenceInDays(endOfDay(end), startOfDay(start))
}

export const filterTodayEvents = (events: Event[], today: Date) => {
  return events
    .filter(
      (e) =>
        isSameDay(today, e.startDate) &&
        !differenceInDaysOmitTime(e.startDate, e.endDate)
    )
    .sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [hours, setIntervalHours] = useState([])
  const [daysList, setDaysList] = useState<Date[]>([])

  const changeWeekHandle = (btnType: 'prev' | 'next' | 'today') => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1))
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1))
    }

    if (btnType === 'today') {
      setCurrentMonth(new Date())
    }
  }

  useEffect(() => {
    const hours = eachMinuteOfInterval(
      {
        start: setMinutes(setHours(new Date(), 6), 0),
        end: setMinutes(setHours(new Date(), 23), 0)
      },
      { step: 60 }
    )

    const mappedHours = hours.map((hour) =>
      format(hour, 'HH:00', {
        locale: ptBR
      })
    )

    setIntervalHours(mappedHours)
  }, [])

  useEffect(() => {
    const weekDays = [0, 1, 2, 3, 4, 5, 6]
    const weekStart = startOfWeek(currentMonth, { weekStartsOn: 1 })

    const daysList = weekDays.map((d) => addDays(weekStart, d))

    setDaysList(daysList)
  }, [currentMonth])

  return (
    <div className="flex h-[calc(100vh_-_70px)] flex-col w-full">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="2022-01">
            {capitalizeFirstLetter(
              format(currentMonth, 'MMMM yyyy', {
                locale: ptBR
              })
            )}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              onClick={() => changeWeekHandle('prev')}
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeWeekHandle('today')}
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              Hoje
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              onClick={() => changeWeekHandle('next')}
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Week view
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
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-200 scrollbar-track-gray-100"
      >
        <div
          style={{ width: '165%' }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {daysList?.map((date, index) => (
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                  key={index}
                >
                  {
                    capitalizeFirstLetter(
                      format(date, 'EEEEEE', {
                        locale: ptBR
                      })
                    )[0]
                  }{' '}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    {format(date, 'dd', {
                      locale: ptBR
                    })}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {daysList?.map((date, index) => (
                <div
                  className="flex items-center justify-center py-3"
                  key={index}
                >
                  {isSameDay(new Date(), date) ? (
                    <span className="flex items-baseline">
                      {capitalizeFirstLetter(
                        format(date, 'EEEEEE', {
                          locale: ptBR
                        })
                      )}{' '}
                      <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                        {format(date, 'dd', {
                          locale: ptBR
                        })}
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-baseline">
                      {capitalizeFirstLetter(
                        format(date, 'EEEEEE', {
                          locale: ptBR
                        })
                      )}{' '}
                      <span className="ml-1.5 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                        {format(date, 'dd', {
                          locale: ptBR
                        })}
                      </span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(36, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {hours?.map((hour) => (
                  <Fragment key={hour}>
                    <div>
                      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {hour}
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto'
                }}
              >
                <Fragment>
                  {allEvents?.map(
                    (event, index) =>
                      daysList.filter(
                        (date) =>
                          isSameDay(date, event.startDate) &&
                          isSameMonth(date, event.startDate) &&
                          isSameYear(date, event.startDate)
                      ).length > 0 && (
                        <CalendarEvent
                          key={index}
                          startDate={event.startDate}
                          endDate={event.endDate}
                          hoursLength={hours?.length}
                          startHour={6}
                          description={event.description}
                          step={60}
                          variant={event.variant as MappedVariants}
                          width={100}
                          left={0}
                        />
                      )
                  )}
                </Fragment>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
