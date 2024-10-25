import { FC, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { classNames } from '@/utils/mergeClassName'

type ComboBoxItem = {
  id: number
  name: string
}

type ComboBoxProps = {
  data: ComboBoxItem[]
  label?: string
  value?: ComboBoxItem['id']
  error?: string
  onChange?(id: number, item: ComboBoxItem): void
}

export const ComboBox: FC<ComboBoxProps> = ({
  data,
  value,
  label,
  error,
  onChange
}) => {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const handleChangeSelectedItem = (item: ComboBoxItem) => {
    if (onChange) {
      onChange(item?.id, item)
    }

    setSelectedItem(item)
  }

  const filteredData =
    query === ''
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  useEffect(() => {
    if (typeof value === 'number') {
      const findValue = data?.find((item) => item.id === value)

      if (typeof findValue?.id === 'number') {
        setSelectedItem(findValue)
      }
    }
  }, [data, value])

  return (
    <Combobox as="div" value={selectedItem} onChange={handleChangeSelectedItem}>
      {!!label && (
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
      )}

      <div className="relative mt-1">
        <Combobox.Input
          autoComplete="off"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item: ComboBoxItem) => item?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredData.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {item.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      {!!error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </Combobox>
  )
}
