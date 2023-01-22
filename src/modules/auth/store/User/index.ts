import { Login_login, Login_login_user } from '@/graphql/generated/Login'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = Omit<Login_login_user, '__typename'>

type UseUserStore = Omit<Login_login, '__typename' | 'user'> & {
  user: User
  updateToken?: (token: string) => void
  updateUser?: (user: User) => void
}

export const useUserStore = create(
  persist<UseUserStore>(
    (set) => ({
      user: null,
      token: null,
      updateToken: (token: string) => {
        set(() => ({
          token
        }))
      },
      updateUser: (user: User) => {
        set(() => ({
          user
        }))
      }
    }),
    {
      name: '@Clinica-Sabrina',
      partialize: (state) => {
        if (state.token) {
          return {
            token: state.token,
            user: state.user
          }
        }
      }
    }
  )
)
