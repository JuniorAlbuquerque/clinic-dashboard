import { Navigate, RouteObject } from 'react-router-dom'

const RedirectRoute: RouteObject = {
  path: '*',
  element: <Navigate to="/home" />
}

export default RedirectRoute
