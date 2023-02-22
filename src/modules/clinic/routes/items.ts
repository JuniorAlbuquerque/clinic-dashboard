import { Cog6ToothIcon, TicketIcon } from '@heroicons/react/24/outline'
import { HomeIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/solid'

const ClinicNavItems = [
  {
    icon: HomeIcon,
    path: '/home',
    description: 'Home'
  },
  {
    icon: CalendarIcon,
    path: '/schedule',
    description: 'Agenda'
  },
  {
    icon: UserIcon,
    path: '/patient',
    description: 'Pacientes'
  },
  {
    icon: TicketIcon,
    path: '/packages',
    description: 'Pacotes/Atendimentos'
  },
  {
    icon: Cog6ToothIcon,
    path: '/settings',
    description: 'Configurações'
  }
]

export default ClinicNavItems
