import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
// import Shop from './Pages/shop/shop'
import Cart from './Pages/cart/cart'
import Navbar from "./components/Navbar"
import {ShopContextProvider} from './context/context'
import {UserContextProvider} from './context/user-context'
import ProductDetail from './components/ProductDetail'
import CreateProduct from './Pages/shop/CreateProduct'
import Success from './Pages/payment/success'
import Cancel from './Pages/payment/cancel'
import Shop from './Pages/shop/Shop'


function App() {
  return (
    <UserContextProvider>
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
            <Route path="/product/create-product" Component={CreateProduct} />
            <Route path="/checkout/success" Component={Success} />
            <Route path="/checkout/cancel" Component={Cancel} />
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </UserContextProvider>

  )
}

export default App
