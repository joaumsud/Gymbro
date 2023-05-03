import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index'
import BackdropProvider from './hooks/backdrop'
import './App.css'

function App() {

  return (
    <BackdropProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </BackdropProvider>
  )
}

export default App
