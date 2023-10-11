import { createContext, useEffect, useState } from 'react';


export const UserContext = createContext(null);

export const UserContextProvider = ( {children} ) => {
    const [token, setToken] = useState('');
    // useEffect(() =>{
    //     const getToken = localStorage.getItem('token');
    //     if(getToken) {
    //         setToken(getToken);
    //     }
    // },[])

    const values= {
        token,
        setToken,
    }

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
  } 