import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/shop">Shop</Link> 
        <Link to="/cart"> Cart</Link>
    </div>
  )
}

export default Navbar