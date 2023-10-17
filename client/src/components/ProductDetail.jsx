import React, { useContext, useEffect, useState } from 'react'
//import { PRODUCTS } from '../Pages/shop/items'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/context'
import axios from 'axios'
import { UserContext } from '../context/user-context'
import jwtDecode from 'jwt-decode';
import Comments from './comments/comments'


const ProductDetail = () => {
    const {cartItems, addItemToCart, products} = useContext(ShopContext)
    const [product, setProduct] = useState(null)
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    // const { token } = useContext(UserContext)
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    // console.log(decodedToken)
    const { id } = useParams()
    

    const fetchComments = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/products/comments`)
            .then((response) => {
                // console.log(response.data)
                const getComments = response.data.filter((comment) => comment.productId === id)
                //console.log(getComments)
                setAllComments(getComments)
                // console.log("launched comments")
                // console.log(getComments)
                // allCommentsFiltered = getComments;
                // console.log(allCommentsFiltered)
                return getComments;
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchProduct = async() => {
            // const currentProduct = await products.find(product => product._id === id)
            // //console.log(currentProduct)
            // console.log(products)
            // if(currentProduct) {
            //     await setProduct(currentProduct)
            // } else {
            //     console.log('Product not found')
            // }
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
                .then((response) => {
                    setProduct(response.data)
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
            //console.log(import.meta.env.VITE_API_URL)
            await axios.post(`${import.meta.env.VITE_API_URL}/product/create-comment`, {comment, id, userId: decodedToken.id})
            .then((response) => {
                // console.log(response);
                // setAllComments
                setComment('');
                fetchComments();
                // console.log(allCommentsFiltered);
                // setAllComments(fetchComments())
                // console.log(allComments);
            })
            .catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }
    // console.log("comment content:" + comment)

    //console.log(allComments)
  return (
    <div>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
        <button onClick={() => addItemToCart(id)}>Add to Cart{cartItems[id] > 0 ? "(" + cartItems[id] + ")" : null}</button>
        
        <h2>Comments</h2>
        {token ? 
            (
                <>
                <p>Laisser un commentaire</p>
                <textarea name="" id="" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={handleComment}>Submit</button>
                </>
            ) 
        : 
            (
                <p><Link to="/"><i>Log in if you want to comment</i></Link></p>
            )
        }

        {
            allComments ? (
                allComments.map(comment => (
                    <Comments comment={comment} key={comment._id}></Comments>
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