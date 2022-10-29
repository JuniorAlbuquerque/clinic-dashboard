import { FC } from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-1 w-full min-h-screen bg-primary-700">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout
