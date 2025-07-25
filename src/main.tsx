import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import '@ant-design/v5-patch-for-react-19';

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
