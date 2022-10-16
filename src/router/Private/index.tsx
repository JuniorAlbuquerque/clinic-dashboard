import { useUserStore } from '@/modules/auth/store/User'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private: FC = () => {
  const token = useUserStore((state) => state.token)

  if (!token) return <Navigate to="/login" />
  return <Outlet />
}

export default Private
