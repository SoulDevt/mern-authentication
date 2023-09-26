import React from 'react'
import { PRODUCTS } from './items'
import Product from '../../components/Product'
import './shop.css'

const Shop = () => {
  return (
    <div>
        <h1>SHOP</h1>
        <div className='products'>           
            {
                PRODUCTS.map((product, index) => (
                    <Product key={index} product={product} />
                ))
            }
        </div>
    </div>
  )
}

export default Shop