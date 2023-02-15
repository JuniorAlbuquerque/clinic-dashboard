import { capitalizeFirstLetter } from '@/utils/autocapitalize'
import { classNames } from '@/utils/mergeClassName'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { EventProps, ToolbarProps, View } from 'react-big-calendar'
import { CustomEventProps } from '../..'

export const CustomEventAgenda = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-xs  font-medium mt-1">{event.title}</p>
      <p className="text-xs">{event.desc}</p>
    </span>
  )
}

export const CustomEventWeek = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-sm font-medium mt-1">{event.title}</p>
      <p className="text-xs">{event.desc}</p>
    </span>
  )
}

export const CustomEventMonth = ({ event }: EventProps<CustomEventProps>) => {
  return (
    <span>
      <p className="text-sm pr-1 font-medium mt-1 truncate">
        {event.title} - {event.desc}
      </p>
    </span>
  )
}

export const CustomToolbar = (props: ToolbarProps) => {
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
