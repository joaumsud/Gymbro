import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Routes from './routes/index'
import './App.css'
function App() {

  return (
    <div className='App.css'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App
