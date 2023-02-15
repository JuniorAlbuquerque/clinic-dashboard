import { Login, LoginVariables } from '@/graphql/generated/Login'
import { LOGIN } from '@/graphql/mutations/login'
import { useCallback } from 'react'
import { useUserStore } from '../../store/User'
import { useMutation } from '@tanstack/react-query'
import graphQLClient from '@/services/graphql'

export function useLogin() {
  const updateUser = useUserStore((state) => state.updateUser)
  const updateToken = useUserStore((state) => state.updateToken)

  const mutationLogin = useMutation({
    mutationFn: async (data: LoginVariables) => {
      const response = await graphQLClient.request<Login, LoginVariables>(
        LOGIN,
        {
          ...data
        }
      )

      return response
    },
    onSuccess(response) {
      updateUser(response?.login?.user)
      updateToken(response?.login?.token)
    }
  })

  const signOut = useCallback(() => {
    updateUser(null)
    updateToken(null)
  }, [updateToken, updateUser])

  return {
    mutationLogin,
    signOut
  }
}
