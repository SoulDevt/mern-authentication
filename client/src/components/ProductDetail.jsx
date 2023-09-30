import React, { useContext, useEffect, useState } from 'react'
//import { PRODUCTS } from '../Pages/shop/items'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/context'

const ProductDetail = () => {
    const {cartItems, addItemToCart, products} = useContext(ShopContext)
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const fetchProduct = async() => {
            const currentProduct = await products.find(product => product._id === id)
            console.log(products)
            if(currentProduct) {
                await setProduct(currentProduct)
            } else {
                console.log('Product not found')
            }
        }
        fetchProduct()
    })
  return (
    <div>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
        <button onClick={() => addItemToCart(id)}>Add to Cart{cartItems[id] > 0 ? "(" + cartItems[id] + ")" : null}</button>
    </div>
  )
}

export default ProductDetail