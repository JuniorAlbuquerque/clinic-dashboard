import { capitalizeFirstLetter } from '@/utils/autocapitalize'
import clsx from 'clsx'
import { FC, useState } from 'react'

type Days = {
  [key: string]: boolean
}

type GroupDaysProps = {
  onChangeDays?(days: Days): void
}

export const GroupDays: FC<GroupDaysProps> = ({ onChangeDays }) => {
  const [selectedDays, setSelectedDays] = useState<Days>({
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false
  })

  const handleSelectDay = (day: string) => {
    const currentDays = { ...selectedDays }

    currentDays[day] = !currentDays[day]

    if (onChangeDays) {
      onChangeDays(currentDays)
    }

    setSelectedDays(currentDays)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-700">
        Dias da semana
      </label>
      <div className="flex flex-wrap  gap-4">
        {Object.entries(selectedDays)?.map(([day, value]) => (
          <button
            className={clsx(
              'py-2 px-4 text-sm rounded-lg border border-slate-300',
              {
                'bg-primary-500': value,
                'text-primary-50': value
              }
            )}
            type="button"
            key={day}
            onClick={() => handleSelectDay(day)}
          >
            {capitalizeFirstLetter(day)}
          </button>
        ))}
      </div>
    </div>
  )
}
