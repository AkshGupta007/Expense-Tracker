import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import { ExpenseProvider } from './context/ContextApi.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseProvider>
      <App />
      <ToastContainer />
    </ExpenseProvider>
  </StrictMode>
)
