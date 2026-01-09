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

    const deleteLaptop = async (id) => {
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

    const updateLaptop = async (id, formData) => {
        try {
            const res = await fetch(`${API_URL}/laptops/${id}`, {
                method: "PATCH",
                credentials: 'include',
                body: formData
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            const index = laptops.findIndex(laptop => laptop._id === result._id);
            const copyLaptops = [...laptops];
            copyLaptops[index] = result;
            setLaptops(copyLaptops);
        } catch(err) {
            alert(err.message);
        }
    }

    const addLaptop = async (formData) => {
        try {
            const res = await fetch(`${API_URL}/laptops`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })

            const result = await res.json();

            if(!res.ok){
                throw new Error(result.message);
            }

            setLaptops([...laptops, result]);
        } catch (e) {
            alert(e.message);
        }
    }

    useEffect(() => {
        getLaptops();
    }, [])


    return (
        <LaptopContext.Provider value={{laptops, deleteLaptop, updateLaptop, addLaptop}}>
            {children}
        </LaptopContext.Provider>
    )
}