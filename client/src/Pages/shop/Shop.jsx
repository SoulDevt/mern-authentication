import React, { useEffect, useState } from 'react'
import { PRODUCTS } from './items'
import Product from '../../components/Product'
import './shop.css'
import axios from 'axios'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [originalProducts, setOriginalProducts] = useState([]) // Ajoutez un état pour stocker la liste originale des produits


  useEffect(() => {
    try {
      // debugger;
      console.log("useEffect front launched")
      const getProducts = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/shop`)
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
  }, [])

  const handleChange = async (e) => {
    const filteredProducts = originalProducts.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // Mettre à jour la liste des produits filtrés
    setProducts(filteredProducts);
  }


  return (
    <div>
      <div className="md:w-1/4 m-auto">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" >
          Search a product
        </label>
        <div className="mt-2 w-96">
          <input
            id="name"
            name="name"
            type="name"
            onChange={handleChange}
            autoComplete="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              products.map((product, index) => (
                <Product key={index} product={product} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop