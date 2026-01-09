import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

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
    const toastId = toast.loading("Creating account...");

    try {
        const res = await fetch(`${API_URL}/auth/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message);
        }

        toast.update(toastId, {
            render: result.message,
            type: "success",
            isLoading: false,
            autoClose: 2000
        });

        navigate("/login");
    } catch (e) {
        toast.update(toastId, {
            render: `Error: ${e.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000
        });
    }
};

    const login = async (formData) => {
    const toastId = toast.loading("Logging in...");

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

        if (!res.ok) {
            throw new Error(result.message);
        }

        setUser(result);

        toast.update(toastId, {
            render: "Logged in successfully ✅",
            type: "success",
            isLoading: false,
            autoClose: 2000
        });

        navigate("/panel");
    } catch (e) {
        toast.update(toastId, {
            render: `Error: ${e.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000
        });
    }
};

    const logout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("User not logged out");
        }

        toast.update(toastId, {
            render: "Logged out successfully 👋",
            type: "success",
            isLoading: false,
            autoClose: 2000
        });
    } catch (e) {
        toast.update(toastId, {
            render: `Error: ${e.message}`,
            type: "error",
            isLoading: false,
            autoClose: 3000
        });
    }
};

    return (
        <AuthContext.Provider value={{user, signUp, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}