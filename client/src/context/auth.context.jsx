import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

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
        } catch (error) {
            alert(error);
        }
    }

    return (
        <AuthContext.Provider value={{user, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}