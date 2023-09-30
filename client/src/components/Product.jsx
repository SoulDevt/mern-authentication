import React, { useContext } from 'react'
import { ShopContext } from '../context/context'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const {_id, name, price, description, img} = props.product
  const {cartItems, addItemToCart, RemoveItemToCart} = useContext(ShopContext)
  return (
    <div className="product">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{price} €</p>
        <img src={img} />
        <button onClick={() => addItemToCart(_id)}>Add to Cart{cartItems[_id] > 0 ? "(" + cartItems[_id] + ")" : null}</button>
        <Link to={"/product/"+_id}>Details</Link>
    </div>
  )
}

export default Product