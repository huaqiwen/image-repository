import React, { useContext, useState, useEffect } from 'react'
import { fbAuth } from '../firebase/config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, pwd) {
        return fbAuth.createUserWithEmailAndPassword(email, pwd);
    }

    function login(email, pwd) {
        return fbAuth.signInWithEmailAndPassword(email, pwd);
    }

    useEffect(() => {
        const unsubscribe = fbAuth.onAuthStateChanged(usr => {
            setCurrentUser(usr);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
