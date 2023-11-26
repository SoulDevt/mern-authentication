import React, { useContext, useState } from 'react'
//import { PRODUCTS } from '../shop/items'
//import Product from '../../components/Product'
import { ShopContext } from '../../context/context'
import CartItem from './CartItem'
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
      // await axios.post("http://localhost:3001/checkout", cartItems)
      await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, detailedCartItems)
      .then((response) => {
        window.location.href = response.data.url
      })
    } catch (error) {
      console.log("error: " + error)
    }
  }

  return (
    // <div>
    //   <h1>Cart</h1>
    //   <div className='products'>           
    //       {
    //           products.map((product, index) => {
    //             //console.log(product)
    //             if(cartItems[product._id] > 0) {
    //               return <CartItem key={index} product={product} />
    //             } 
    //           })
    //       }
    //   </div>
    //   <p>Total: {totalAmount}</p>
    //   <Link to="/shop">Continue Shopping</Link>
    //   <button onClick={handleCheckout}>Checkout</button>
    // </div>

    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-semibold mb-4">Cart</h1>
    <div className="grid gap-4">
           {
               products.map((product, index) => {
                 //console.log(product)
                 if(cartItems[product._id] > 0) {
                   return <CartItem key={index} product={product} />
                 } 
               })
       }
    </div>
    <div className="flex justify-between items-center mt-4">
      <p className="text-xl font-semibold">Total: ${totalAmount}</p>
      <Link to="/shop" className="text-blue-500 hover:underline">
        Continue Shopping
      </Link>
      <button
        onClick={handleCheckout}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Checkout
      </button>
    </div>
  </div>
  )
}

export default Cart