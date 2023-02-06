import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
)
