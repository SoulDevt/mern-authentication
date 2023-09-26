import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', {name,email,password})
      .then((response) => {
        console.log(response.data)
        if(response.status == 200) {
          console.log(response.data)
          navigate("/dashboard")
        } else {
          console.log(response.data)
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
          <h1>Register</h1>
          <label htmlFor="">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label htmlFor="">Password</label>
          <input type="password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  )
}

export default Register
