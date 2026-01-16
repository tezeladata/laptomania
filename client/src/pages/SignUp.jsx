import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";

const SignUp = () => {
    const { signUp } = useAuth();
    const [formData, handleChange] = useForm({
        fullname: "",
        email: "",
        password: ""
    });

    const handleSubmit = e => {
        e.preventDefault();
        signUp(formData);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Sign up
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                        name="fullname"
                        placeholder="Fullname"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <button
                        type="submit"
                        className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignUp;