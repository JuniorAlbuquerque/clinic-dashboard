import { FC } from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <div className="flex w-full h-screen bg-primary-700">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout
