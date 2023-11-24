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
            console.log(response)
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
    <div className="comment border p-4 rounded-md mb-4">
      <p className="text-lg font-semibold">Author: {username}</p>
      <p className="text-gray-700 mt-2">{comment.text}</p>
    </div>
  )
}

export default Comments