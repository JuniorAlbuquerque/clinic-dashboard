import Routes from '@/router/router'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const App: FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        bodyClassName={() => 'font-sans flex gap-1 p-2 items-center'}
      />
      <Routes />
    </BrowserRouter>
  )
}

export default App
