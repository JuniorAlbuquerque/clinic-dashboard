import { useAuth } from '@/modules/auth/hooks/useAuth'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private: FC = () => {
  const { isLogged } = useAuth()

  if (!isLogged) return <Navigate to="/login" />

  return <Outlet />
}

export default Private
