import { createContext, useState } from 'react';
import { PRODUCTS } from '../Pages/shop/items';


export const ShopContext = createContext(null);

const initCartItems = () => {
    let cart = {};
    for(let i = 1; i <= PRODUCTS.length; i++) {
        cart[i] = 0
    }
    return cart; 
}

export const ShopContextProvider = ( {children} ) => {
    const [cartItems, setCartItems] = useState(initCartItems())

    const getTotalCartAmount = () => {
        console.log("totalamount launched")
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo =  PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        console.log(totalAmount)
        return totalAmount;
    }
    
    const addItemToCart = (ItemId) => {
        console.log("launched")
        setCartItems((prevState) => ({
            ...prevState, 
            [ItemId]: prevState[ItemId] + 1
        }));
        console.log("item id: " + ItemId)
        console.log(cartItems);
    }

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
        getTotalCartAmount
    }

    return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>
  } 