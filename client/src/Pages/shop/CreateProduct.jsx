import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateProduct = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categories: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Envoyez les données du formulaire ou effectuez toute autre action nécessaire ici
    await axios.post(`${import.meta.env.VITE_API_URL}/shop/create-product`, formData, { withCredentials: true })
      .then((response) => {
        toast.success(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              Product Description
            </label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="text-sm font-medium text-gray-600">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="text-sm font-medium text-gray-600">
              Categories
            </label>
            <input
              type="text"
              name="categories"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="img" className="text-sm font-medium text-gray-600">
              Product Image URL
            </label>
            <input
              type="text"
              name="img"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Product
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateProduct