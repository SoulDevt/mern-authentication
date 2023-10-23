import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { decodeToken } from "react-jwt";
import { UserContext } from '../context/user-context';


const Navbar = () => {

  // const verifyToken = (token) => {
  //   try {
  //     // Remplacez 'YOUR_SECRET_KEY' par votre clé secrète utilisée pour signer les tokens sur le serveur
  //     const decodedToken = decodeToken(token);
  //     console.log(decodedToken)
  //     if (decodedToken.exp * 1000 > Date.now()) {
  //       // Le token est valide et non expiré
  //       return true;
  //     } else if(!decodedToken) {
  //       console.log("fake token")
  //       localStorage.removeItem('token')
  //     }
  //   } catch (error) {
  //     console.log("token expiré");
  //   }
  //   return false;
  // };
  

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   return <Navigate to={"/"} />;
  // }

  // const token = localStorage.getItem("token")

  const { isLoggedIn, logout } = useContext(UserContext);
  
  return (
    // <div>
    //     <Link to="/shop">Shop</Link> 
    //     <Link to="/cart"> Cart</Link>
    //     <Link to="/product/create-product">Create Product</Link>

    // </div>



    <nav className="flex flex-wrap items-center justify-between p-4 bg-white">
      <div className="w-auto lg:order-2 lg:w-1/5 lg:text-center">
        <a className="text-xl font-semibold text-gray-800 font-heading" href="#">
          SoulShopV2
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>
              Menu
            </title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
            </path>
          </svg>
        </button>
      </div>
      <div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">

        <Link to="/shop" className='block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600'>Shop</Link> 

        <Link to="/cart" className='block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600'>Cart</Link> 
        
        <Link to="/product/create-product" className='block mt-4 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600'>Create product</Link> 

      </div>
      <div className="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
        {
          isLoggedIn ? 
          (
            <Link className='block mt-4 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600' onClick={logout}>Logout</Link> 
          ) :
          (
            <>
            <Link to="/" className='block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600'>Login</Link> 
            <Link to="/register" className='block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600'>Register</Link> 
            </>
          )
        }

      </div>
    </nav>


  )
}

export default Navbar