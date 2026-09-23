import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './redesign.css'
import App from './App.tsx'
import { DonationProvider } from './components/DonationDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DonationProvider>
      <App />
    </DonationProvider>
  </StrictMode>,
)
