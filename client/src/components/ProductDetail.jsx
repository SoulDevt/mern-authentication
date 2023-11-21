import React, { useContext, useEffect, useState } from 'react'
//import { PRODUCTS } from '../Pages/shop/items'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/context'
import axios from 'axios'
import { UserContext } from '../context/user-context'
import jwtDecode from 'jwt-decode';
import Comments from './comments/Comments'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = () => {
    const { cartItems, addItemToCart, products } = useContext(ShopContext)
    const [product, setProduct] = useState(null)
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const userString = localStorage.getItem("user");
    let user;
    if (userString) {
        user = JSON.parse(userString);
    }
    const { id } = useParams()

    // const fetchComments = async () => {
    //     try {
    //         await axios.get(`${import.meta.env.VITE_API_URL}/products/comments`)
    //         .then((response) => {
    //             const getComments = response.data.filter((comment) => comment.productId === id)
    //             setAllComments(getComments)
    //             return getComments;
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchComments = async () => {
        try {
            toast.loading('Loading comments...', { autoClose: false });
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/comments?productId=${id}&page=${currentPage}`);
            setAllComments(response.data);
            toast.dismiss();
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                toast.loading('Loading product...', { autoClose: false });
                await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
                    .then((response) => {
                        setProduct(response.data);
                        toast.dismiss();
                        console.log(response.data)
                    })
                    .catch((error) => {
                        toast.error(error);
                        console.log(error.response.data)
                    })
            } catch (error) {
                console.log(error)
                toast.error(error)
            }
        }
        fetchProduct()

        //fetch comments
        fetchComments();
        //end fetch comments
    }, [id, currentPage])

    const handleComment = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/product/create-comment`, { comment, id, userId: user.id }, { withCredentials: true })
                .then((response) => {
                    toast.success(response.data.success);
                    console.log(response);
                    setComment('');
                    fetchComments();
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    const addItemToWishlist = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/wishlist/add`, { productId: id, userId: user.id }, { withCredentials: true })
                .then((response) => {
                    toast.success(response.data.message);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="w-full">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
                        <p className="text-gray-600 text-lg">{product.description}</p>
                        <p className="text-lg font-semibold text-indigo-600 mt-4">
                            ${product.price}
                        </p>
                        <div className="mt-6">
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-4"
                                onClick={() => addItemToCart(id)}
                            >
                                Add to Cart {cartItems[id] > 0 && `(${cartItems[id]})`}
                            </button>
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                onClick={addItemToWishlist}
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Comments of users</h2>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Leave a comment</p>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md ml-2 text-sm"
                        onClick={handleComment}
                    >
                        Submit
                    </button>
                </div>
                <p className="mt-4">
                    <Link to="/">
                        <i className="text-gray-600 text-sm">
                            Log in if you want to comment
                        </i>
                    </Link>
                </p>
                {allComments.length > 0 ? (
                    allComments.map((comment) => (
                        <>
                            <Comments comment={comment} key={comment._id}></Comments>
                        </>

                    ))
                ) : (
                    <p className="text-gray-600 text-sm">
                        There are no comments for this product yet.
                    </p>
                )}
                {/* Pagination */}
                <div>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        Précédent
                    </button>
                    <span> Page:  {currentPage} </span>
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Suivant
                    </button>
                </div>
            </div>
            <ToastContainer position="top-center"/>
        </div>
    )
}

export default ProductDetail