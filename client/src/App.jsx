import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Cart from './Pages/cart/Cart'
import Navbar from "./components/Navbar"
import {ShopContextProvider} from './context/context'
import {UserContextProvider} from './context/user-context'
import ProductDetail from './components/ProductDetail'
import CreateProduct from './Pages/shop/CreateProduct'
import Success from './Pages/payment/Success'
import Cancel from './Pages/payment/Cancel'
import Shop from './Pages/shop/Shop'
import Wishlist from './Pages/wishlist/Wishlist'
import page404 from './Pages/page404/page404'


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
            <Route path="/wishlist" Component={Wishlist} />
            <Route path="/checkout/success" Component={Success} />
            <Route path="/checkout/cancel" Component={Cancel} />
            <Route path="*" Component={page404} />
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </UserContextProvider>

  )
}

export default App
