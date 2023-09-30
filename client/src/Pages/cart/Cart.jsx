import React, { useContext } from 'react'
import { PRODUCTS } from '../shop/items'
import Product from '../../components/Product'
import { ShopContext } from '../../context/context'
import CartItem from './cartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {cartItems, getTotalCartAmount, products} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount();
  console.log(cartItems)
  return (
    <div>
      <h1>Cart</h1>
      <div className='products'>           
          {
              products.map((product, index) => {
                //console.log(product)
                if(cartItems[product._id] > 0) {
                  return <CartItem key={index} product={product} />
                } 
              })
          }
      </div>
      <p>Total: {totalAmount}</p>
      <Link to="/shop">Continue Shopping</Link>
      <Link to="/cart">Checkout</Link>
    </div>
  )
}

export default Cart