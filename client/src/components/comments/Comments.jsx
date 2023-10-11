import React from 'react'
import './comments.css'
const Comments = ({comment}) => {
//   useEffect(() => {
//     const getUser = async () => {
//         axios.get(`${import.meta.env.VITE_API_URL}/products/comments`)
//     }
//   })
  return (
    <div className="comment">
        <p>Author: {comment.userId}</p>
        <p>{comment.text}</p>
    </div>
  )
}

export default Comments