import { DatePicker } from '@/components/DatePicker'
import { GroupDays } from '@/components/GroupDays'
import { Input } from '@/components/Form/Input'
import { Text } from '@/components/Text'
import { FC, Fragment } from 'react'
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { AppointmentData } from '..'
// import { PencilSquareIcon } from '@heroicons/react/24/outline'
// import { addDays, format, setHours, setMinutes } from 'date-fns'
// import { addMinutes } from 'date-fns/esm'
// import { capitalizeFirstLetter } from '@/utils/autocapitalize'
// import { useDebouncedEffect } from '@/utils/hooks/useDebounceEffect'
// import ptBR from 'date-fns/locale/pt-BR'
import { ListBox } from '@/components/Form/ListBox'

type ScheduleFormProps = {
  control: Control<AppointmentData>
  errors?: FormState<AppointmentData>['errors']
  watch?: UseFormWatch<AppointmentData>
  setValue?: UseFormSetValue<AppointmentData>
}

const data = [
  {
    id: 0,
    name: 'Não'
  },
  {
    id: 1,
    name: 'Sim'
  }
]

export const ScheduleForm: FC<ScheduleFormProps> = ({
  control,
  errors,
  watch
}) => {
  // const [bestHour, setBestHour] = useState('08:00')
  // const [completeddMonth, setCompletedMonth] = useState({
  //   id: 0,
  //   name: 'Não'
  // })
  // const packageQuantity = watch('appointment.package')
  // const initial_date = watch('schedule.initial_date')
  // const appointmentDays = watch('schedule.apppointmend_days')

  // const isAllowedDay = useCallback(
  //   (date: Date) => {
  //     const day = format(date, 'EEEEEE', {
  //       locale: ptBR
  //     })

  //     return days[day]
  //   },
  //   [days]
  // )

  // const generateDays = useCallback(
  //   (currentDate: Date, quantity: number, best_hour: string) => {
  //     if (quantity === 1 && Object.values(days).filter(Boolean).length > 1) {
  //       return
  //     }

  //     const arrDate = []

  //     const [hour, minute] = best_hour.split(':').map((str) => parseInt(str))

  //     if (isNaN(hour) || isNaN(minute)) return

  //     while (arrDate.length < quantity) {
  //       if (isAllowedDay(currentDate)) {
  //         const initial_date = setMinutes(setHours(currentDate, hour), minute)

  //         arrDate.push({
  //           initial_date,
  //           end_date: addMinutes(initial_date, 50)
  //         })
  //       }

  //       currentDate = addDays(currentDate, 1)
  //     }

  //     // setAppointmentDays(arrDate)
  //     setValue('schedule.apppointmend_days', arrDate)
  //   },
  //   [days, isAllowedDay, setValue]
  // )

  // useDebouncedEffect(
  //   () => {
  //     if (Object.values(days).filter(Boolean).length === 0 || !initial_date) {
  //       setValue('schedule.apppointmend_days', [])
  //     }

  //     if (
  //       packageQuantity?.quantity &&
  //       initial_date &&
  //       Object.values(days).filter(Boolean).length > 0
  //     ) {
  //       if (completeddMonth?.id === 1) {
  //         generateDays(initial_date, packageQuantity?.quantity * 4, bestHour)
  //       } else {
  //         generateDays(initial_date, packageQuantity?.quantity, bestHour)
  //       }
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [packageQuantity, bestHour, initial_date, days, completeddMonth],
  //   300
  // )

  return (
    <Fragment>
      <div className="flex flex-col gap-1">
        <Text renderAs="h2">Agenda</Text>
        <Text renderAs="p" className="text-slate-500 text-sm">
          Aqui você pode ajustar as datas e horários dos atendimentos
        </Text>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Controller
          name="schedule.initial_date"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <DatePicker
                label="Date de início"
                value={value}
                onDateChange={onChange}
                error={errors?.schedule?.initial_date?.message}
              />
            )
          }}
        />

        <Controller
          name="schedule.best_hour"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                label="Melhor Horário"
                type="time"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                error={errors?.schedule?.best_hour?.message}
              />
            )
          }}
        />

        <Controller
          control={control}
          name="schedule.weekDays"
          render={({ field: { onChange } }) => {
            return (
              <GroupDays
                limitDays={watch('appointment.package')?.quantity || null}
                onChangeDays={(days) => {
                  onChange(days)
                }}
                error={errors?.schedule?.weekDays?.message}
              />
            )
          }}
        />

        <Controller
          name="schedule.completed_month"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <ListBox
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={value as unknown as any}
                data={data || []}
                label="Mês inteiro"
                onChange={(item) => {
                  // setCompletedMonth(item)
                  onChange(item)
                }}
              />
            )
          }}
        />

        {/* <div className="w-full mt-2 md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Agenda de atendimentos
          </label>

          {appointmentDays?.length > 0 ? (
            <Fragment>
              <div className="mt-2 grid grid-cols-5 px-2 pt-1 text-sm">
                <div className="ml-2 col-span-2">Data</div>
                <div>Início</div>
                <div>Fim</div>
                <div></div>
              </div>

              {appointmentDays?.map((date, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 mt-2 text-sm border border-gray-300 p-3 rounded-2xl"
                >
                  <div className="col-span-2">
                    {capitalizeFirstLetter(
                      format(date.initial_date, 'EEEEEE dd/MM/yyyy', {
                        locale: ptBR
                      })
                    )}
                  </div>
                  <div>
                    {format(date.initial_date, 'HH:mm', {
                      locale: ptBR
                    })}
                  </div>
                  <div>
                    {format(date.end_date, 'HH:mm', {
                      locale: ptBR
                    })}
                  </div>
                  <button className="ml-auto my-0 pr-2 cursor-pointer">
                    <PencilSquareIcon width={20} className="text-primary-500" />
                  </button>
                </div>
              ))}
            </Fragment>
          ) : (
            <Text renderAs="p" className="mt-2 text-sm text-slate-500">
              Nenhum pacote ou dia da semana selecionado...
            </Text>
          )}
        </div> */}
      </div>
    </Fragment>
  )
}
