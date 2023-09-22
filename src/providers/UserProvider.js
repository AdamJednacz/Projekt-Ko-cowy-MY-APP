import {createContext, useContext, useEffect, useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/FireBase';
export const UserContext = createContext(null)



export const UserProvider = ({children}) =>{
    const [user,setUser] = useState(null)

    useEffect(() =>{
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
               setUser(null)
            }
        });
    },[])
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)