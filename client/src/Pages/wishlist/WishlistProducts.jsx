import axios from 'axios';
import React from 'react'

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
                console.log(response)
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <img src={product.imageUrl} alt={product.name} />
        <button onClick={handleDelete}>Delete from my wishlist</button>
    </div>
  )
}

export default WishlistProducts