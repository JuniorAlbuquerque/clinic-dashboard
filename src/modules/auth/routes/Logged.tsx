import { useUserStore } from '@/modules/auth/store/User'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Logged: FC = () => {
  const token = useUserStore((state) => state.token)

  if (token) return <Navigate to="/" />

  return <Outlet />
}

export default Logged
