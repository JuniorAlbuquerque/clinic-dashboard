import AuthRoutes from '@/modules/auth/routes/router'
import ClinicRoutes from '@/modules/clinic/routes/router'
import { FC } from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import Private from './Private'
import RedirectRoute from './Redirect'

const Routes: FC = () => {
  return useRoutes([
    {
      element: <Outlet />,
      children: [
        AuthRoutes,
        {
          element: <Private />,
          children: [ClinicRoutes]
        }
      ]
    },
    RedirectRoute
  ])
}

export default Routes
