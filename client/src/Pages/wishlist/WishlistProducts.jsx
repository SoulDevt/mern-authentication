import React from 'react'

const WishlistProducts = ({product}) => {
  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <img src={product.imageUrl} alt={product.name} />
    </div>
  )
}

export default WishlistProducts