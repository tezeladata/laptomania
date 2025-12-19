import { useState } from "react"

export const useForm = (initValues) => {
    const [formData, setFormData] = useState(initValues);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}))
    }

    return [formData, handleChange]
};