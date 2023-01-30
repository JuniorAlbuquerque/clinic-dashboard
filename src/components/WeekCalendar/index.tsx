import { capitalizeFirstLetter } from '@/utils/autocapitalize'
import { classNames } from '@/utils/mergeClassName'
import {
  add,
  addDays,
  addWeeks,
  format,
  getMonth,
  getWeek,
  isSameDay,
  startOfWeek,
  subWeeks
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FC, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Text } from '../Text'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Dropdown, { DropdownValue } from '../Dropdown'

const daysOfWeek = 7
const dayOfWeekFormat = 'EEEEEE'
const monthFormat = 'MMM'

type WeekCalendarProps = {
  onChange?: (date: Date) => void
}

const WeekCalendar: FC<WeekCalendarProps> = ({ onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth))
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [allMonths, setAllMonths] = useState<DropdownValue[]>([])
  const [selectedMonth, setSelectedMonth] = useState<DropdownValue>(null)

  const springAnimateConfig = {
    type: 'spring',
    stiffness: 500,
    damping: 30
  }

  const selectedClassName = 'bg-primary-500 text-white'

  const onDateClickHandle = (day: Date) => {
    setSelectedDate(day)
    onChange && onChange(day)
  }

  const changeWeekHandle = (btnType: 'prev' | 'next') => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1))
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)))
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1))
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)))
    }
  }

  const renderWeek = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 })

    const days = []
    let day = startDate

    for (let i = 0; i < daysOfWeek; i++) {
      days.push(day)
      day = addDays(day, 1)
    }

    return days
  }

  const changeMonth = (month: DropdownValue) => {
    setCurrentMonth(new Date(month?.value))
  }

  useEffect(() => {
    if (allMonths?.length) {
      const getMonthByCurrentDate = allMonths.find(
        (item) => getMonth(new Date(item.value)) === getMonth(currentMonth)
      )

      setSelectedMonth(getMonthByCurrentDate)
    }
  }, [currentMonth, allMonths])

  useEffect(() => {
    const date = new Date(new Date().getFullYear(), 0, 1)

    const months = []

    for (let i = 0; i < 12; i++) {
      const month = add(date, {
        months: i
      })

      months.push({
        id: i,
        label: capitalizeFirstLetter(
          format(month, monthFormat, {
            locale: ptBR
          })
        ),
        value: month
      })
    }

    setAllMonths(months)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="pl-4 pr-2 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Text renderAs="h1" className="mr-2">
            Agenda Semanal
          </Text>

          <button onClick={() => changeWeekHandle('prev')}>
            <ChevronLeftIcon width={20} />
          </button>
          <button onClick={() => changeWeekHandle('next')}>
            <ChevronRightIcon width={20} />
          </button>
        </div>
        <div className="w-32">
          <Dropdown
            options={allMonths}
            onChange={(month) => changeMonth(month)}
            value={selectedMonth}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWeek ? currentWeek : 'empty'}
          initial={{ x: 10, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <ul className="grid grid-cols-7 gap-4 justify-items-center max-w-xl">
            {renderWeek().map((day, i) => {
              const formattedDate = format(day, 'd')

              const formatedDay = format(day, dayOfWeekFormat, {
                locale: ptBR
              })

              return (
                <li className="relative" key={i}>
                  <div
                    className={`w-14 py-2 flex flex-col gap-2 items-center justify-center text-xl rounded-xl cursor-pointer relative z-10 ${
                      isSameDay(day, new Date())
                        ? isSameDay(day, selectedDate)
                          ? 'text-white'
                          : 'text-primary-400'
                        : isSameDay(day, selectedDate)
                        ? 'text-white'
                        : ''
                    }`}
                    key={day.getDate()}
                    onClick={() => {
                      onDateClickHandle(day)
                    }}
                  >
                    <div className="text-xs">
                      {capitalizeFirstLetter(formatedDay)}
                    </div>

                    <span className="number">{formattedDate}</span>
                  </div>

                  {isSameDay(day, selectedDate) && (
                    <motion.div
                      className={classNames(
                        'absolute w-full h-full rounded-xl top-0 z-0',
                        selectedClassName
                      )}
                      initial={false}
                      layoutId="outline"
                      transition={springAnimateConfig}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default WeekCalendar
