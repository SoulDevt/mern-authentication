import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../context/user-context';

const Dashboard = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, userEmailConnected, userId } = useContext(UserContext)
  const userString = localStorage.getItem("user");
  let user;
  if (userString) {
    user = JSON.parse(userString);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/users/` + user.email, {withCredentials: true})
        .then((response) => {
         console.log(response.data)
         setName(response.data.name);
         setEmail(response.data.email);
        })
      } catch (error) {
        console.log(error)
      }

    }
    fetchUsers();
  },[])

  const handleUpdate= async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/` + email, {name,email,password}, {withCredentials: true})
      .then((response) => {
        console.log(response.data)
      })
    } catch (error) {
      console.error(error)
    }    
  }
  return (
    <div>
      <h1>Profile: </h1>
      <form action="" onSubmit={handleUpdate}>
        <label htmlFor="">Name: </label>
        <input type="text" name="quote" id="" value={name}  onChange={(e) => setName(e.target.value)} />
        <label htmlFor="">Email: </label>
        <input type="text" name="quote" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password: </label>
        <input type="text" name="quote" id="" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Submit"/>
      </form>
    </div>

  )
}

export default Dashboard