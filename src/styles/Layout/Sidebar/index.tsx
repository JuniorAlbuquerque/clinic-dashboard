import { FC, useState } from 'react'
import { PowerIcon } from '@heroicons/react/24/solid'
import { ReactComponent as LogoFlower } from '@/assets/flower.svg'
import { Link, NavLink } from 'react-router-dom'
import { menuItems } from './menu-items'
import { ModalLogout } from '@/modules/auth/components/ModalLogout'

const Sidebar: FC = () => {
  const [openModalLogout, setOpenModalLogout] = useState(false)

  return (
    <div className="flex flex-col fixed gap-8 w-20 h-screen z-50 bg-primary-700 text-white items-center px-8 py-4">
      <Link to="/home">
        <LogoFlower width={46} height={50} />
      </Link>

      <nav className="h-full">
        <ul className="flex h-full flex-col gap-4">
          {menuItems?.map((menu) => {
            const Icon = menu.icon

            return (
              <NavLink
                to={menu.path}
                key={menu.path}
                className={({ isActive }) =>
                  `p-2 bg-[#311B3A] rounded-md flex items-center hover:text-white hover:scale-105 transition-all ${
                    isActive ? 'text-white' : 'text-gray-700'
                  }`
                }
              >
                <Icon width={20} />
              </NavLink>
            )
          })}

          <li
            className="p-2 text-red-500 mt-auto cursor-pointer bg-opacity-60 bg-primary-800 rounded-md flex items-center hover:text-red-600 hover:scale-105 transition-all"
            onClick={() => setOpenModalLogout(true)}
          >
            <PowerIcon width={24} />
          </li>
        </ul>
      </nav>

      <ModalLogout
        open={openModalLogout}
        onClose={() => setOpenModalLogout(false)}
      />
    </div>
  )
}

export default Sidebar
