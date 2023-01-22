import { useUserStore } from '@/modules/auth/store/User'
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL
})

const errorControl = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message.toLowerCase().includes('access denied')) {
        useUserStore.persist.clearStorage()
        window.location.href = '/login'
      }
    })
  }
  if (networkError) {
    console.log(' [Network error]:', networkError)
  }
})

const authLink = setContext((_, { headers }) => {
  const token = useUserStore.getState().token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorControl, httpLink]),
  cache: new InMemoryCache()
})
