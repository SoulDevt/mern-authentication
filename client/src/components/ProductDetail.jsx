import React, { useContext, useEffect, useState } from 'react'
//import { PRODUCTS } from '../Pages/shop/items'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/context'
import axios from 'axios'
import { UserContext } from '../context/user-context'
import jwtDecode from 'jwt-decode';
import Comments from './comments/Comments'


const ProductDetail = () => {
    const {cartItems, addItemToCart, products} = useContext(ShopContext)
    const [product, setProduct] = useState(null)
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const userString = localStorage.getItem("user");
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
     const { id } = useParams()

    const fetchComments = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/products/comments`)
            .then((response) => {
                const getComments = response.data.filter((comment) => comment.productId === id)
                setAllComments(getComments)
                return getComments;
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
                .then((response) => {
                    setProduct(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()

        //fetch comments
        fetchComments();
        //end fetch comments
    },[])

    const handleComment = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/product/create-comment`, {comment, id, userId: user.id}, {withCredentials: true})
            .then((response) => {
                console.log(response);
                setComment('');
                fetchComments();
            })
            .catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addItemToWishlist = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/wishlist/add`, {productId: id, userId: user.id}, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
            });
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
        <button onClick={() => addItemToCart(id)}>Add to Cart{cartItems[id] > 0 ? "(" + cartItems[id] + ")" : null}</button><br />
        <button onClick={() => addItemToWishlist()}>Add to my Wishlist</button>
        
        <h2>Comments</h2>
                <>
                <p>Laisser un commentaire</p>
                <textarea name="" id="" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={handleComment}>Submit</button>
                </>

                <p><Link to="/"><i>Log in if you want to comment</i></Link></p>

        {
            allComments ? (
                allComments.map(comment => (
                    <Comments comment={comment}  key={comment._id}></Comments>
                ))
            )
            :
            (
                <p>Il n'y  a pas encore de commentaires pour ce produit</p>
            )
        }

    </div>
  )
}

export default ProductDetail