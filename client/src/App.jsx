import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Shop from './Pages/shop/shop'
import Cart from './Pages/cart/cart'
import Navbar from "./components/Navbar"
import {ShopContextProvider} from './context/context'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/shop" Component={Shop} />
          <Route path="/cart" Component={Cart} />
          <Route path="/product/:id" Component={ProductDetail} />
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  )
}

export default App
