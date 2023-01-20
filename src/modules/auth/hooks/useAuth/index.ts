import { useMemo } from 'react'
import { useUserStore } from '../../store/User'

export function useAuth() {
  const token = useUserStore((state) => state.token)
  const user = useUserStore((state) => state.user)

  const isLogged = useMemo(() => !!token, [token])

  return {
    isLogged,
    user
  }
}
