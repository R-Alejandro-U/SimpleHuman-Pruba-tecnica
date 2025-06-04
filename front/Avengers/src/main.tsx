import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CandidateProvider } from './Context/Candidate.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CandidateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CandidateProvider>
  </StrictMode>,
)
