import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WeatherProvider } from './context/weather.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
)
