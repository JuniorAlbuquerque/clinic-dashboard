import { Dashboard } from '../pages/Dashboard'
import { Schedule } from '../pages/Schedule'
import { RouteObject } from 'react-router-dom'
import MainLayout from '@/styles/Layout/MainLayout'
import Patient from '../pages/Patient'
import NewAppointment from '../pages/NewAppointment'
import Settings from '../pages/Settings'
import Packages from '../pages/Packages'
import PackageView from '../pages/PackageView'

const ClinicRoutes: RouteObject = {
  element: <MainLayout />,
  children: [
    {
      element: <Dashboard />,
      path: '/home'
    },
    {
      element: <Schedule />,
      path: '/schedule'
    },
    {
      element: <Patient />,
      path: '/patient'
    },
    {
      element: <NewAppointment />,
      path: '/schedule/new-appointment'
    },
    {
      element: <Settings />,
      path: '/settings'
    },
    {
      element: <Packages />,
      path: '/packages'
    },
    {
      element: <PackageView />,
      path: '/packages/:id'
    }
  ]
}

export default ClinicRoutes
