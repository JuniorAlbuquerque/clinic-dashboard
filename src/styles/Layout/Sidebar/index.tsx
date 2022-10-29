import { FC } from 'react'
import {
  HomeIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid'
import { ReactComponent as LogoFlower } from '@/assets/flower.svg'
import { Link } from 'react-router-dom'

const Sidebar: FC = () => {
  return (
    <div className="flex flex-col gap-8 w-20 h-auto bg-primary-700 text-white items-center px-8 py-4">
      <Link to="/home">
        <LogoFlower width={46} height={50} />
      </Link>

      <nav>
        <ul className="flex flex-col gap-4">
          <Link to="/home">
            <li className="p-2 bg-[#311B3A] rounded-md flex items-center">
              <HomeIcon width={20} className="text-white" />
            </li>
          </Link>

          <Link to="/home">
            <li className="p-2 bg-[#311B3A] rounded-md flex items-center">
              <CalendarIcon width={20} className="text-gray-600" />
            </li>
          </Link>

          <Link to="/home">
            <li className="p-2 bg-[#311B3A] rounded-md flex items-center">
              <CurrencyDollarIcon width={20} className="text-gray-600" />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
