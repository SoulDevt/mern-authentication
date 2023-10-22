import React, { useContext } from 'react'
import { ShopContext } from '../context/context'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const {_id, name, price, description, imageUrl} = props.product
  const {cartItems, addItemToCart, RemoveItemToCart} = useContext(ShopContext)
  return (
    // <div className="product">
    //     <h3>{name}</h3>
    //     <p>{description}</p>
    //     <p>{price} €</p>
    //     <img src={img} />
        //  <button onClick={() => addItemToCart(_id)}>Add to Cart{cartItems[_id] > 0 ? "(" + cartItems[_id] + ")" : null}</button>
    //     <Link to={"/product/"+_id}>Details</Link>
    // </div>
    <>
      <Link key={_id} to={"/product/"+_id} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imageUrl}
            alt={imageUrl}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{price}€</p>
      </Link>
    </>
  )
}

export default Product