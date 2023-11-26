import { createContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../Pages/shop/items';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const ShopContext = createContext(null);

// const initCartItems = (products) => {
//     let cart = {};
//     for(let i = 1; i <= products.length; i++) {
//         cart[i] = 0
//     }
//     console.log(cart);
//     return cart; 
// }

// const initCartItems = () => {
//   return {};
// }

export const ShopContextProvider = ( {children} ) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({})


    useEffect(() => {
        try {
          const getProducts = async () => {
            await axios.get(`${import.meta.env.VITE_API_URL}/shop`)
            .then((response) => {
              //console.log(response.data)
              setProducts(response.data)
              //console.log(response.data)
            })
          }
          getProducts();
        } catch (error) {
          console.log(error)
        }
      },[])

      //console.log(products)

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo =  products.find((product) => product._id === item);
                //console.log(itemInfo)
                totalAmount += Number(cartItems[item]) * Number(itemInfo.price);
            }
        }
        return totalAmount;
    }
    
    // const addItemToCart = (ItemId) => {
    //     console.log("launched")
    //     setCartItems((prevState) => ({
    //         ...prevState, 
    //         [ItemId]: prevState[ItemId] + 1
    //     }));
    //     console.log("item id: " + ItemId)
    //     console.log(cartItems);
    // }

    // const addItemToCart = (productId) => {
    //     console.log("launched")
    //     // Trouvez le produit correspondant à l'ID dans la liste des produits récupérés
    //     const productToAdd = products.find((product) => product._id === productId);
    //     //console.log(productToAdd)
      
    //     if (productToAdd) {
    //       console.log("founded")
    //       setCartItems((prevState) => ({
    //         ...prevState,
    //         [productId]: prevState[productId] + 1,
    //       }));
    //     } else {
    //         console.log("not found")
    //     }
    //   };

    const addItemToCart = (productId) => {
        toast.success("Product added to cart");
        if (!cartItems[productId]) {
          // Si le produit n'existe pas dans le panier, initialisez-le à 1
          setCartItems((prevState) => ({
            ...prevState,
            [productId]: 1,
          }));
        } else {
          // Sinon, augmentez simplement la quantité de ce produit
          setCartItems((prevState) => ({
            ...prevState,
            [productId]: prevState[productId] + 1,
          }));
        }
      };
      
      

    const removeItemToCart = (ItemId) => {
        setCartItems((prevState) => ({
            ...prevState, 
            [ItemId]: prevState[ItemId] - 1
        }));
    }

    const updateItemToCart = (newAmount, ItemId) => {
        setCartItems((prevState) => ({
            ...prevState, 
            [ItemId]: newAmount
        }));
    }

    const values= {
        cartItems,
        addItemToCart,
        removeItemToCart,
        updateItemToCart,
        getTotalCartAmount,
        products
    }

    return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>
  } 