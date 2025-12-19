import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm"

const SignUp = () => {
    const {signUp} = useAuth();
    const [formData, handleChange] = useForm({
        fullname: "",
        email: "",
        password: ""
    });

    const handleSubmit = e => {
        e.preventDefault();

        signUp(formData)
    }

    return (
        <main>
            <h1>Sign up</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.fullname} onChange={handleChange} name="fullname" placeholder="Fullname" required />
                <input type="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email" required />
                <input type="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" required />

                <button type="submit">Submit</button>
            </form>
        </main>
    )
};

export default SignUp;