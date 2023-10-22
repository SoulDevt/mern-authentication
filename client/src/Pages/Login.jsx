import { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/user-context'
import ProtectedRoute from '../components/common/ProtectedRoute'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken } = useContext(UserContext)
  const tokenStorage = localStorage.getItem('token')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/login', { email, password })
        .then((response) => {
          console.log(response.data)
          if (response.data.status == "ok") {
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            navigate("/dashboard");
          }
          else {
            console.log("Failed to authenticate")
          }
        })
    } catch (error) {
      console.log("500 - Failed to authenticate " + error)
    }

  }

  return (
    <>
      {/* <div>
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold underline">Login</h1>
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="Login" />
        </form>
        <Link to="/register">Create an account</Link>
      </div> */}
      <ProtectedRoute condition={tokenStorage} redirectTo={"/shop"}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
            </p>
          </div>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default Login
