import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Logged: FC = () => {
  const { isLogged } = useAuth()

  if (isLogged) return <Navigate to="/" />

  return <Outlet />
}

export default Logged
