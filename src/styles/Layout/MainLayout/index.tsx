import { FC } from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-1 w-full h-screen bg-primary-700">
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
