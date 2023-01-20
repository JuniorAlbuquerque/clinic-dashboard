import { Dashboard } from '../pages/Dashboard'
import { Schedule } from '../pages/Schedule'
import { RouteObject } from 'react-router-dom'
import MainLayout from '@/styles/Layout/MainLayout'
import Patient from '../pages/Patient'

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
    }
  ]
}

export default ClinicRoutes
