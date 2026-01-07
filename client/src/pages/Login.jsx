import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm"

const Login = () => {
    const {login} = useAuth();
    const [formData, handleChange] = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = e => {
        e.preventDefault();

        login(formData)
    }

    return (
        <main>
            <h1>Log in</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email" required />
                <input type="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" required />

                <button type="submit">Submit</button>
            </form>
        </main>
    )
};

export default Login;