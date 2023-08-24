import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import UserProvider from './hooks/userProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <ThemeProvider theme={theme}>
    <UserProvider>
      <div className='index.css' >
        <App />
      </div>
    </UserProvider>
  </ThemeProvider>
)
