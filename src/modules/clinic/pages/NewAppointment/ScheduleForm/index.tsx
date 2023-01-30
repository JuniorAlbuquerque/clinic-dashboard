import { DatePicker } from '@/components/DatePicker'
import { GroupDays } from '@/components/GroupDays'
import Input from '@/components/Input/Input'
import { Text } from '@/components/Text'
import { FC, Fragment, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AppointmentData } from '..'

type ScheduleFormProps = {
  control: Control<AppointmentData>
}

export const ScheduleForm: FC<ScheduleFormProps> = ({ control }) => {
  const [bestHour, setBestHour] = useState('08:00')

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
              />
            )
          }}
        />

        <Input
          label="Melhor Horário"
          type="time"
          value={bestHour}
          onChange={(event) => setBestHour(event.target.value)}
        />

        <GroupDays />
      </div>
    </Fragment>
  )
}
