import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const token = localStorage.getItem('token');
  let decodedToken = '';

  if(token) decodedToken = decodeToken(token);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      //token = localStorage.getItem('token');
      //const decodedToken = decodeToken(token)
      //console.log(decodedToken.email);
      if(token) {
        await axios.get('http://localhost:3001/users/' + decodedToken.email, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
         console.log(response.data)
         setName(response.data.name);
         setEmail(response.data.email);
        })
      } else {
        localStorage.removeItem('token');
        navigate('/')
      }
    }
    fetchUsers();
  },[])

  const handleUpdate= async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/users/' + decodedToken.email, {name,email,password}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
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