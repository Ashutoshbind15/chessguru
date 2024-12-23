import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'sonner'
import GamesProvider from './context/GamesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GamesProvider>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
    </GamesProvider>
  </StrictMode>,
)