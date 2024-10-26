import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { queryClient } from './services/queryClient'
// import { client } from './services/apollo'
import 'react-tooltip/dist/react-tooltip.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ApolloProvider client={client}> */}
      <App />
      {/* </ApolloProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
)
