import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../context/context'
import { Link } from 'react-router-dom'

const CartItem = ({product}) => {
  useEffect(() => {
    console.log("launched");
    console.log("products:" + product)
  },[])
const {cartItems, addItemToCart, removeItemToCart, updateItemToCart} = useContext(ShopContext)
  return (
        <div className="product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <img src={product.img} />
            <button onClick={() => removeItemToCart(product.id)}> - </button>
            <input type="text" value={cartItems[product._id]} onChange={(e) => updateItemToCart(Number(e.target.value), product.id)} />
            <button onClick={() => addItemToCart(product.id)}> + </button>
        </div>
  )
}

export default CartItem