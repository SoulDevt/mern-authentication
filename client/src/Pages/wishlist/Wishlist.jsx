import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WishlistProducts from './WishlistProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    const [products, setProducts] = useState([])
    const userString = localStorage.getItem("user");
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    useEffect(() => {
        try {
            toast.loading('Loading your wishlist...', { autoClose: false });
            const getWishlist = async () => {
                const wishlist = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist/${user.id}`, {withCredentials: true})
                setProducts(wishlist.data)
                toast.dismiss();
            }
            getWishlist();
        } catch (error) {
            console.log(error)
        }
    },[])
  return (
    <>
    <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
    <div className="w-full flex flex-wrap">
      {products.map((product, key) => (
        <WishlistProducts product={product} key={key} />
      ))}
    </div>
    <ToastContainer position="top-center"/>
    </>
  )
}

export default Wishlist