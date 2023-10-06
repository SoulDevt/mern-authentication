import React, { useContext, useState } from 'react'
//import { PRODUCTS } from '../shop/items'
//import Product from '../../components/Product'
import { ShopContext } from '../../context/context'
import CartItem from './cartItem'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
  const {cartItems, getTotalCartAmount, products} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount();
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
      await axios.post("http://localhost:3001/checkout", cartItems)
      .then(response => {
        console.log("réponse: " + response)
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