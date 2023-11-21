import axios from 'axios';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistProducts = ({product}) => {
    const userString = localStorage.getItem("user");
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    const handleDelete = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/wishlist/${product._id}`, {userId: user.id}, {withCredentials: true})
            .then((response) => {
                console.log(response);
                toast.success(response.data);
            })
        } catch (error) {
            toast.error(error)
            console.log(error);
        }
    }
  return (
    <div className="bg-white shadow-md p-4 m-2 rounded-md">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-32 h-32 object-contain mx-auto"
      />
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-blue-500 font-semibold mt-2">{product.price} €</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Remove from Wishlist
      </button>
      <ToastContainer />
    </div>
  )
}

export default WishlistProducts