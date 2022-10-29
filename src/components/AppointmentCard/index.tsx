import { classNames } from '@/utils/mergeClassName'
import { UserIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Text } from '../Text'

type AppointmentCardProps = {
  text: string
  subtitle: string
  variant: 'blue' | 'violet'
  footerText: string
  active?: boolean
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  text,
  subtitle,
  variant,
  footerText,
  active
}) => {
  const styleByVariant = {
    blue: 'bg-blue-100 text-blue-900',
    violet: 'bg-primary-50 text-primary-500'
  }

  const activeClass = () => {
    if (active) {
      return {
        footer: 'text-primary-500 font-bold',
        card: 'border-2 border-primary-500'
      }
    }

    return {
      footer: 'text-gray-700 font-medium',
      card: 'border border-primary-200'
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={classNames(
          'flex flex-col items-center cursor-pointer ease-in-out duration-300 scale-1 hover:scale-105 hover:bg-slate-50 p-4 gap-2 h-44 w-40 justify-between rounded-2xl',
          activeClass().card
        )}
      >
        <div className={classNames('p-2 rounded-lg', styleByVariant[variant])}>
          <UserIcon width={20} />
        </div>

        <Text renderAs="span" className="text-center font-semibold text-lg">
          {text}
        </Text>

        <Text renderAs="span" className="text-center text-xs text-gray-700">
          {subtitle}
        </Text>
      </div>

      <span className={classNames('text-center', activeClass().footer)}>
        {footerText}
      </span>
    </div>
  )
}

export default AppointmentCard
