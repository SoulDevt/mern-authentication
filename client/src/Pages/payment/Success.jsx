import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div>
        <h1>Thank you for your purchase !</h1>
        <Link to="/shop">Continue Shopping</Link>
    </div>
  )
}

export default Success