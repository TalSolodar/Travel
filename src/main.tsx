import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production pages arrive pre-rendered, so React attaches to the existing HTML; in dev the root is empty.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
