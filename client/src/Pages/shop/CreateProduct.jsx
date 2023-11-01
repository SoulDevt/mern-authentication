import axios from 'axios';
import React, { useState } from 'react'

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
    await axios.post(`${import.meta.env.VITE_API_URL}/shop/create-product`, formData, {withCredentials: true})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })

    };

  return (
    <div>
        <h1>Create product</h1>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input type="text" name="name" onChange={handleChange} />
            <br />
            <label htmlFor="">Description</label>
            <textarea type="text" name="description" onChange={handleChange} />
            <br />
            <label htmlFor="">Price</label>
            <input type="number" autoComplete="on" name="price" onChange={handleChange} />
            <br />
            <label htmlFor="">Categories</label>
            <input type="text" autoComplete="on" name="categories" onChange={handleChange} />
            <br />
            <label htmlFor="">Image</label>
            <input type="text" autoComplete="on" name="img" onChange={handleChange} />
            <br />
            <input type="submit" value="Create" />
        </form>
    </div>
  )
}

export default CreateProduct