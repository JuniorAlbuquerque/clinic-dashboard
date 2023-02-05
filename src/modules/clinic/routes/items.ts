import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { HomeIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/solid'

const ClinicNavItems = [
  {
    icon: HomeIcon,
    path: '/home'
  },
  {
    icon: CalendarIcon,
    path: '/schedule'
  },
  {
    icon: UserIcon,
    path: '/patient'
  },
  {
    icon: Cog6ToothIcon,
    path: '/settings'
  }
]

export default ClinicNavItems
