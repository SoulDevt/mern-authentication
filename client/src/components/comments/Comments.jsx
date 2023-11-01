import React, { useEffect, useState } from 'react'
import './comments.css'
import axios from 'axios'
const Comments = ({comment}) => {
  const [username, setUsername] = useState()

  const fetchUserById = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/users/infos/${comment.userId}`, {withCredentials: true})
        .then((response) => {
            setUsername(response.data.name)
        })
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  //fetch Username
  fetchUserById();
  //end fetch Username
},[])


  return (
    <div className="comment">
        <p>Author: {username}</p>
        <p>{comment.text}</p>
    </div>
  )
}

export default Comments