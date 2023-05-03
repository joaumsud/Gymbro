import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import LoginPage from './pages/LoginAndRegisterPage'
import Routes from './routes/index'
import './App.css'
function App() {

  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  )
}

export default App
