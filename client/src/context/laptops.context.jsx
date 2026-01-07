import {createContext, useContext, useEffect, useState} from "react";

const LaptopContext = createContext();

export const useLaptop = () => useContext(LaptopContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const LaptopProvider = ({children}) => {
    const [laptops, setLaptops] = useState([]);

    const getLaptops = async () => {
        try {
            const res = await fetch(`${API_URL}/laptops`)

            if(!res.ok){
                throw new Error("Something went wrong");
            }

            const result = await res.json();
            setLaptops(result);
        } catch (e) {
            alert(e.message)
        }
    }

    const deleteLaptops = async (id) => {
        try {
            const res = await fetch(`${API_URL}/laptops/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if(!res.ok){
                const result = await res.json();
                throw new Error(result.message);
            }

            setLaptops(prev => prev.filter(laptop => laptop._id !== id));
        } catch (e) {
            alert(e.message)
        }
    }

    const updateLaptops = async (id, info) => {
        try {
            const res = await fetch(`${API_URL}/laptops/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(info),
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            const updatedLaptop = await res.json();

            setLaptops((prev) =>
                prev.map((laptop) =>
                    laptop._id === id ? updatedLaptop : laptop
                )
            );
        } catch (e) {
            alert(e.message);
        }
    }

    useEffect(() => {
        getLaptops();
    }, [])


    return (
        <LaptopContext.Provider value={{laptops, deleteLaptops, updateLaptops}}>
            {children}
        </LaptopContext.Provider>
    )
}