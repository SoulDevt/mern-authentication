import React, { useContext, useState } from 'react'
//import { PRODUCTS } from '../shop/items'
//import Product from '../../components/Product'
import { ShopContext } from '../../context/context'
import CartItem from './cartItem'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
  const {cartItems, getTotalCartAmount, products} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate()
  //console.log(cartItems)

    // Fonction pour obtenir les détails complets des produits dans le panier
    const getDetailedCartItems = () => {
      const detailedCartItems = [];
      for (const productId in cartItems) {
        //console.log(productId)
        const product = products.find((p) => p._id === productId);
        console.log(product)
        if (product) {
          detailedCartItems.push({
            id: productId,
            quantity: cartItems[productId],
            name: product.name,
            description: product.description,
            price: product.price,
            img: product.imageUrl,
          });
        }
      }
      return detailedCartItems;
    };

  const handleCheckout = async () => {
    try {
      const detailedCartItems = getDetailedCartItems();
      console.log(detailedCartItems);
      console.log(cartItems);
      // await axios.post("http://localhost:3001/checkout", cartItems)
      await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, detailedCartItems)
      .then((response) => {
        console.log(response.data.url)
        window.location.href = response.data.url
      })
    } catch (error) {
      console.log("error: " + error)
    }
  }

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
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Cart