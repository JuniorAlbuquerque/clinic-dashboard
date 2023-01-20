import AuthRoutes from '@/modules/auth/routes/router'
import ClinicRoutes from '@/modules/clinic/routes/router'
import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import Private from './Private'
import RedirectRoute from './Redirect'

const Routes: FC = () => {
  return useRoutes([
    {
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
