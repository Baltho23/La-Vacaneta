'use client'
import { redirect } from "next/navigation";
import { Context, createContext, useContext, useEffect, useState } from "react"
import { UsuarioModel } from "../models/usuario.model";
import { API_METHODS, POST } from "../util/fetching";

const AuthContext: Context<any> = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    
    const [ user, setUser ]: [UsuarioModel | null, Function] = useState(null);
    const [ protectedRoute, setProtectedRoute]: [boolean, Function] = useState(false);
    const [ loading, setLoading]: [boolean, Function] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(API_METHODS.user.checkToken + token)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUser(data.usuario)
                    setLoading(false);
                }
            ).catch(
                (error) => console.log(error)
            );
        } else {
            setLoading(false);
        }
    }, [])

    const login = (user: any) => {
        setUser(user);
    }

    const logout = () => {
        if (user) {
            fetch(API_METHODS.user.logout + user['id'], {...POST})
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                localStorage.removeItem('token');
                setUser(null);
            }
            ).catch(
                (error) => console.log(error)
            );
        }
        
    }

    if (!loading) {
        if (protectedRoute && user) {
            redirect('/login');
        } else {
            return (
                <AuthContext.Provider value={{user, login, logout}}>
                    { children }
                </AuthContext.Provider>
            )
        }
    }
}

