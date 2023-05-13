import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index'
import BackdropProvider from './hooks/backdrop'
import './App.css'
import { FeedbackProvider } from './hooks/addFeedback'
function App() {

  return (
    <BackdropProvider>
      <BrowserRouter>
        <FeedbackProvider>
          <Routes />
        </FeedbackProvider>
      </BrowserRouter>
    </BackdropProvider>
  )
}

export default App
