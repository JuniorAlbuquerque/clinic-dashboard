import { Login, LoginVariables } from '@/graphql/generated/Login'
import { LOGIN } from '@/graphql/mutations/login'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from '../../store/User'

export function useLogin() {
  const [mutationLogin, { data, loading }] = useMutation<Login>(LOGIN)
  const updateUser = useUserStore((state) => state.updateUser)
  const updateToken = useUserStore((state) => state.updateToken)

  const login = useCallback(
    async (userData: LoginVariables, onSuccess?: () => void) => {
      await mutationLogin({
        variables: {
          data: userData.data
        },
        onCompleted: (response) => {
          updateUser(response?.login?.user)
          updateToken(response?.login?.token)
          onSuccess()
        },
        onError: (error) => {
          toast(error?.message, {
            type: 'error'
          })
        }
      })
    },
    []
  )

  return {
    login,
    data,
    loading
  }
}
