import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./GoogleAuth";
import { ReactNode } from 'react'

interface ThemeProviderProps {
    children: ReactNode;
}



const AuthContext = createContext<any>({});
export const AuthContextProvider = ({ children }: ThemeProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        console.log(user)
        signInWithPopup(auth, provider);
    };
    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, []);
    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(AuthContext)
} 