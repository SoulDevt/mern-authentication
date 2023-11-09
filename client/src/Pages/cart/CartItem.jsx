import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../context/context'
import { Link } from 'react-router-dom'

const CartItem = ({ product }) => {
  useEffect(() => {
    console.log("launched");
    console.log("products:" + product)
  }, [])
  const { cartItems, addItemToCart, removeItemToCart, updateItemToCart } = useContext(ShopContext)
  return (
    <div className="border border-gray-300 p-4 rounded-md mb-4 flex items-center">
      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-4" />

      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center">
        <button
          className="text-red-600 font-semibold px-2"
          onClick={() => removeItemToCart(product._id)}
        >
          -
        </button>
        <input
          className="w-8 text-center border border-gray-300 mx-2"
          type="text"
          value={cartItems[product._id]}
          onChange={(e) => updateItemToCart(Number(e.target.value), product._id)}
        />
        <button
          className="text-green-600 font-semibold px-2"
          onClick={() => addItemToCart(product._id)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem