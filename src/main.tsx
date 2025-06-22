import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'

import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f65f42',
            colorLink: '#f65f42',

          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>


  </StrictMode>,
)
