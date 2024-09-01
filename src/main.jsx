import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import logo from '../src/assets/avatar.jpeg'
import AppWrapper from './Pages/firstScreen.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AppWrapper logo={logo} appName="CBT Web" duration={3000}>
      <App />
    </AppWrapper>
  </React.StrictMode>
)
