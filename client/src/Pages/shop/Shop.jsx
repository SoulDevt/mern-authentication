import React, { useEffect, useState } from 'react'
import { PRODUCTS } from './items'
import Product from '../../components/Product'
import './shop.css'
import axios from 'axios'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [originalProducts, setOriginalProducts] = useState([]) // Ajoutez un état pour stocker la liste originale des produits


  useEffect(() => {
    try {
      console.log("useEffect front launched")
      const getProducts = async () => {
        await axios.get("http://localhost:3001/shop")
        .then((response) => {
          setProducts(response.data)
          setOriginalProducts(response.data)
        })
        .catch(error => {
          console.log("Failed to get products")
        })
      }
      getProducts();
    } catch (error) {
      console.log("Failed to get products")
    }
  },[])

  const handleChange = async (e) => {
    setSearch(e.target.value)
    const filteredProducts = originalProducts.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // Mettre à jour la liste des produits filtrés
    setProducts(filteredProducts);
  }
  return (
    <div>
        <h1>SHOP</h1>
        <div>
            <label htmlFor="">Search: </label>
            <input type="text" value={search} onChange={handleChange}/>
        </div>
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