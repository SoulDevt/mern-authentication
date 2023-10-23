import { createContext, useEffect, useState } from 'react';


export const UserContext = createContext(null);

export const UserContextProvider = ( {children} ) => {
    // const [token, setToken] = useState('');
    // useEffect(() =>{
    //     const getToken = localStorage.getItem('token');
    //     if(getToken) {
    //         setToken(getToken);
    //     }
    // },[])

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = () => {
      localStorage.setItem("token", localStorage.getItem("token"));
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };

    const values= {
        // token,
        // setToken,
        login,
        isLoggedIn,
        logout
    }

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
  } 