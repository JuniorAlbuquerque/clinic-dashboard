import { Login } from '../pages/Login'
import { RouteObject } from 'react-router-dom'
import Logged from './Logged'

const AuthRoutes: RouteObject = {
  element: <Logged />,
  children: [
    {
      element: <Login />,
      path: '/login'
    }
  ]
}

export default AuthRoutes
