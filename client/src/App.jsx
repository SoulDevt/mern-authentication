import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
