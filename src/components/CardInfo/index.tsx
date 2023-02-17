import { FC, FunctionComponent, SVGProps } from 'react'
import { Text } from '../Text'
import { ReactComponent as AppointmentUserIcon } from '@/assets/appointment-user.svg'
import { ReactComponent as PatientsIcon } from '@/assets/patients.svg'
import { ReactComponent as DoctorIcon } from '@/assets/doctor.svg'
import Spinner from '../Spinner'

export type VariantType = 'patient' | 'professional' | 'appointment'

type CardInfoProps = {
  active?: boolean
  variant?: VariantType
  count?: number
  busy?: boolean
  onSelect?: (type?: VariantType) => void
}

type RenderByVariantType = {
  [key in VariantType]: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>
    iconColor: string
    numberColor: string
    textColor: string
    text: string
  }
}

const CardInfo: FC<CardInfoProps> = ({
  active,
  busy,
  variant,
  count,
  onSelect
}) => {
  const renderByVariant: RenderByVariantType = {
    patient: {
      icon: PatientsIcon,
      iconColor: 'bg-primary-500',
      numberColor: 'bg-primary-500',
      textColor: 'white',
      text: 'Pacientes'
    },
    professional: {
      icon: DoctorIcon,
      iconColor: 'bg-[#FFF4E2]',
      numberColor: 'bg-[#DA9461]',
      textColor: 'white',
      text: 'Profissionais'
    },
    appointment: {
      icon: AppointmentUserIcon,
      iconColor: 'bg-[#D2FFEF]',
      numberColor: 'bg-[#025046]',
      textColor: 'white',
      text: 'Atendimentos'
    }
  }

  const Icon = renderByVariant[variant].icon

  return (
    <div
      className={`bg-white p-1 pt-4 cursor-pointer transition-all hover:scale-105 ${
        active ? 'h-48 md:h-56' : 'h-44 md:h-52'
      } w-fit rounded-3xl flex flex-col gap-4 items-center justify-between`}
      onClick={() => {
        onSelect && onSelect(variant)
      }}
    >
      <div className={`p-2 ${renderByVariant[variant].iconColor} rounded-lg`}>
        <Icon width={24} height={28} />
      </div>

      <Text
        renderAs="span"
        className={` text-lg text-center ${
          active ? 'text-black font-semibold' : 'text-gray-700'
        }`}
      >
        {renderByVariant[variant].text}
      </Text>

      {active ? (
        <div
          className={`${renderByVariant[variant].numberColor} text-white w-40 md:w-48 p-2 md:p-4 rounded-3xl flex items-center justify-center font-medium text-5xl`}
        >
          {busy ? (
            <div className="ml-7">
              <Spinner />
            </div>
          ) : (
            count
          )}
        </div>
      ) : (
        <div className="text-black w-40 md:w-48 flex mb-4 items-center justify-center font-medium text-5xl">
          {busy ? (
            <div className="ml-7">
              <Spinner />
            </div>
          ) : (
            count
          )}
        </div>
      )}
    </div>
  )
}

export default CardInfo
