import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const autoLogin = async () => {
            const res = await fetch(`${API_URL}/auth/auto-login`, {
                method: "POST",
                credentials: "include",
            });

            const result = await res.json();

            if (res.ok) {
                setUser(result);
                navigate("/panel")
            }
        }

        autoLogin();
    }, [])

    const signUp = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            };

            alert(result.message)
            navigate("/login")
        } catch (error) {
            alert(error);
        }
    }

    const login = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            };

            setUser(result);
            navigate("/panel");
        } catch (error) {
            alert(error);
        }
    }

    const logout = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            if(!res.ok) {
                throw new Error("User not logged out");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <AuthContext.Provider value={{user, signUp, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}