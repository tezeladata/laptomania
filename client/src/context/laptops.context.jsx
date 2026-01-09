import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

const LaptopContext = createContext();

export const useLaptop = () => useContext(LaptopContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const LaptopProvider = ({children}) => {
    const [laptops, setLaptops] = useState([]);
    const [cart, setCart] = useState([]);

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
        const toastId = toast.loading("Deleting laptop...");

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
            toast.update(toastId, {
                render: "Laptop deleted successfully ✅",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })
        } catch (e) {
            toast.update(toastId, {
                render: `Error: ${e.message}`,
                type: "error",
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    const updateLaptop = async (id, formData) => {
        const toastId = toast.loading("Updating laptop...");

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
            toast.update(toastId, {
                render: "Laptop updated successfully ✅",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })
        } catch(err) {
            toast.update(toastId, {
                render: `Error: ${e.message}`,
                type: "error",
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    const addLaptop = async (formData) => {
        const toastId = toast.loading("Adding laptop...");

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
            toast.update(toastId, {
                render: "Laptop addded successfully ✅",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })
        } catch (e) {
            toast.update(toastId, {
                render: `Error: ${e.message}`,
                type: "error",
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    const addToCart = (product) => {
        const laptop = cart.find(obj => obj._id === product._id);

        if (laptop) {
            setCart(prev => prev.map(obj => obj._id === product._id ? {...obj, quantity: obj.quantity+1} : obj));
            return;
        } else {
            setCart(prev => [...prev, {...product, quantity: 1}]);
        }
    }

    const reduceOne = (product) => {
        if (product.quantity === 1) {
            setCart(prev => prev.filter(obj => obj._id !== product._id))
        } else {
            setCart(prev => prev.map(obj => obj._id === product._id ? {...obj, quantity: obj.quantity-1} : obj));
            return;
        }
    }

    const removeProduct = (product) => {
        setCart(prev => prev.filter(obj => obj._id !== product._id))
    };

    const clearCart = () => {
        setCart([]);
    }

    useEffect(() => {
        getLaptops();
    }, [])


    return (
        <LaptopContext.Provider value={{laptops, deleteLaptop, updateLaptop, addLaptop, addToCart, reduceOne, removeProduct, clearCart, cart}}>
            {children}
        </LaptopContext.Provider>
    )
}