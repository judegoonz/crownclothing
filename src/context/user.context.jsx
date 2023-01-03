import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener,createUserDocAuth } from '../utility/firebase/firebase.utility';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubsribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocAuth(user);
        }
            setCurrentUser(user);
        });

        return unsubsribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}