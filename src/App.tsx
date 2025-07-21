import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer autoClose={2500} />
      </BrowserRouter>
   </>
    
  )
}

export default App
