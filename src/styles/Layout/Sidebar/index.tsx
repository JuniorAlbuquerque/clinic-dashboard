import { FC, useState } from 'react'
import { PowerIcon } from '@heroicons/react/24/solid'
import { ReactComponent as LogoFlower } from '@/assets/flower.svg'
import { Link, NavLink } from 'react-router-dom'
import { menuItems } from './menu-items'
import { ModalLogout } from '@/modules/auth/components/ModalLogout'
import Tooltip from '@/components/Tooltip'

const Sidebar: FC = () => {
  const [openModalLogout, setOpenModalLogout] = useState(false)

  return (
    <div className="flex flex-col gap-8 w-20 h-screen h-screen-ios min-h-screen-ios z-50 bg-primary-700 text-white items-center px-8 py-4">
      <nav className="flex flex-col flex-1 fixed top-8">
        <Link to="/home">
          <LogoFlower width={46} height={50} />
        </Link>

        <ul className="h-full mt-8 flex flex-1 flex-col gap-4">
          {menuItems?.map((menu) => {
            const Icon = menu.icon

            return (
              <NavLink
                to={menu.path}
                key={menu.path}
                id={menu.path.replace('/', '')}
                className={({ isActive }) =>
                  `p-2 bg-[#311B3A] rounded-md flex items-center justify-center hover:text-white hover:scale-105 transition-all ${
                    isActive ? 'text-white' : 'text-gray-700'
                  }`
                }
              >
                <Icon width={20} />
                <Tooltip anchorSelect={`#${menu.path.replace('/', '')}`}>
                  {menu.description}
                </Tooltip>
              </NavLink>
            )
          })}

          <li
            className="p-2 fixed bottom-4 self-end text-red-500 mt-auto cursor-pointer bg-opacity-60 bg-primary-800 rounded-md flex items-center hover:text-red-600 hover:scale-105 transition-all"
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
