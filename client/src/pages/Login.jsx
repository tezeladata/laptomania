import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";

const Login = () => {
  const { login } = useAuth();
  const [formData, handleChange] = useForm({ email: "", password: "" });

  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Log in</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;