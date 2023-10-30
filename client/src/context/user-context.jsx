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
    const [userEmailConnected, setUserEmailConnected] = useState('');
    const [userId, setUserId] = useState('');

    const login = (email, id) => {
      // localStorage.setItem("token", localStorage.getItem("token"));
      setUserEmailConnected(email);
      setUserId(id);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify({email : email, id: id}))
    };
  
    const logout = () => {
      // localStorage.removeItem("token");
      setIsLoggedIn(false);
    };

    const values= {
        // token,
        // setToken,
        login,
        isLoggedIn,
        logout,
        userEmailConnected,
        setUserEmailConnected,
        setUserId,
        userId

    }

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
  } 