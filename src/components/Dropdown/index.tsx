import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  CheckIcon,
  ChevronUpDownIcon
} from '@heroicons/react/20/solid'
import { classNames } from '@/utils/mergeClassName'

export type DropdownValue = {
  id: number | string
  label: string
  value: number | string | Date
}

type DropdownProps = {
  label?: string
  value?: DropdownValue
  options: DropdownValue[]
  placeholder?: string
  onChange: (value: DropdownValue) => void
}

function Dropdown({
  label,
  value,
  placeholder = '',
  options,
  onChange
}: DropdownProps) {
  const [selectedItem, setSelectedItem] = useState(value)

  useEffect(() => {
    if (value) {
      setSelectedItem(value)
    }
  }, [value])

  return (
    <Listbox
      value={selectedItem}
      defaultValue={value}
      onChange={(value) => {
        onChange(value)
        setSelectedItem(value)
      }}
    >
      {({ open }) => (
        <>
          {!!label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
          )}

          <div className="relative mt-1 flex-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-primary-50 py-2 pl-3 pr-10 text-left focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
              <span className="flex gap-2 items-center truncate font-medium">
                <CalendarIcon width={20} />
                {selectedItem?.label || placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-primary-100 scrollbar-track-gray-100 absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-primary-500' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option?.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primart-500',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Dropdown
