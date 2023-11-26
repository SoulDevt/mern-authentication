import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../context/user-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
         setName(response.data.name);
         setEmail(response.data.email);
        })
      } catch (error) {
        toast.error(error)
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
        toast.success(response.data);
      })
    } catch (error) {
      toast.error(error)
      console.error(error)
    }    
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold mb-4">Profile:</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-center"/>
    </div>

  )
}

export default Dashboard