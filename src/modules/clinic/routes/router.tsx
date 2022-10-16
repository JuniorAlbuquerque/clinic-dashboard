import { Dashboard } from '../pages/Dashboard'
import { RouteObject } from 'react-router-dom'
import MainLayout from '@/styles/Layout/MainLayout'

const ClinicRoutes: RouteObject = {
  element: <MainLayout />,
  children: [
    {
      element: <Dashboard />,
      path: '/'
    }
  ]
}

export default ClinicRoutes
