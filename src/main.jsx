import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import route from './route/route/route.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './Contextapi/UserContext/userProvider.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
      <RouterProvider router={route}></RouterProvider>
      </UserProvider>
    </QueryClientProvider>
 
  </StrictMode>,
)
