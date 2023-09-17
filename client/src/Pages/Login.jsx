import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'


function Login() {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/login', {email,password})
      .then((response) => {
        console.log(response.data)
        if(response.data.status == "ok") {
          localStorage.setItem('token', response.data.token);
          navigate("/dashboard");
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Login" />
        </form>
        <Link to="/register">Create an account</Link>
      </div>
    </>
  )
}

export default Login
