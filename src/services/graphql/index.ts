import { useUserStore } from '@/modules/auth/store/User'
import { GraphQLClient } from 'graphql-request'
import { RequestMiddleware } from 'graphql-request/dist/types'
import { toast } from 'react-toastify'
const abortController = new AbortController()

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function middleware(request: RequestInit) {
  const token = useUserStore.getState().token

  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
}

const graphQLClient = new GraphQLClient(import.meta.env.VITE_API_URL, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseMiddleware(response: any) {
    const parsedResponse = JSON.parse(JSON.stringify(response, null, 2))

    if (parsedResponse?.response?.errors?.length > 0) {
      toast(parsedResponse?.response?.errors[0]?.message, {
        type: 'error'
      })
    }

    if (response?.message?.toLowerCase().includes('access denied')) {
      useUserStore.persist.clearStorage()
      window.location.href = '/login'
    }
  },
  requestMiddleware: middleware as unknown as RequestMiddleware,
  signal: abortController.signal
})

export default graphQLClient
