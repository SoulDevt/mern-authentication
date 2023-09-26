import React, { useContext } from 'react'
import { ShopContext } from '../context/context'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const {id, title, price, description, img} = props.product
  const {cartItems, addItemToCart, RemoveItemToCart} = useContext(ShopContext)
  return (
    <div className="product">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price} €</p>
        <img src={img} />
        <button onClick={() => addItemToCart(id)}>Add to Cart{cartItems[id] > 0 ? "(" + cartItems[id] + ")" : null}</button>
        <Link to="/product/:id">Details</Link>
    </div>
  )
}

export default Product