import React, { useEffect, useState } from 'react'
import { PRODUCTS } from './items'
import Product from '../../components/Product'
import './shop.css'
import axios from 'axios'

const Shop = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      console.log("useEffect front launched")
      const getProducts = async () => {
        await axios.get("http://localhost:3001/shop")
        .then((response) => {
          //console.log(response.data)
          setProducts(response.data)
        })
      }
      getProducts();
    } catch (error) {
      console.log(error)
    }
  },[])
  //console.log(products)
  return (
    <div>
        <h1>SHOP</h1>
        <div className='products'>           
            {
                products.map((product, index) => (
                    <Product key={index} product={product} />
                ))
            }
        </div>
    </div>
  )
}

export default Shop