import { FC } from 'react'
import {
  HomeIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid'
import { ReactComponent as LogoFlower } from '@/assets/flower.svg'
import { Link, NavLink } from 'react-router-dom'
import { menuItems } from './menu-items'

const Sidebar: FC = () => {
  return (
    <div className="flex flex-col fixed gap-8 w-20 h-screen z-50 bg-primary-700 text-white items-center px-8 py-4">
      <Link to="/home">
        <LogoFlower width={46} height={50} />
      </Link>

      <nav>
        <ul className="flex flex-col gap-4">
          {menuItems?.map((menu) => {
            const Icon = menu.icon

            return (
              <NavLink
                to={menu.path}
                key={menu.path}
                className={({ isActive }) =>
                  `p-2 bg-[#311B3A] rounded-md flex items-center hover:text-white transition-all ${
                    isActive ? 'text-white' : 'text-gray-700'
                  }`
                }
              >
                <Icon width={20} />
              </NavLink>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
