import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Dacă pagina vine deja randată (prerender la build), doar o "activăm".
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
