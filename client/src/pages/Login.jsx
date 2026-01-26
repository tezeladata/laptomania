import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card1";
import { Input, Label } from "../components/UI/Input1";
import { Button } from "../components/UI/Button1";
import { Link } from "react-router";
import { Reveal } from "../components/UI/Reveal1";

const Login = () => {
  const { login } = useAuth();
  const [formData, handleChange] = useForm({ email: "", password: "" });
  const googleAuthUrl = `${import.meta.env.VITE_API_URL}/api/oauth/google`;

  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(129,140,248,0.3),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(248,113,113,0.25),transparent_45%),linear-gradient(160deg,#060b1c,#0f1b33)]" />

      <Reveal>
        <Card className="mx-auto w-full max-w-md bg-white/10 p-6 text-white backdrop-blur sm:max-w-xl sm:p-8">
          <CardHeader className="space-y-3 p-0">
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Access</p>
            <CardTitle className="text-3xl text-white">Log in</CardTitle>
            <p className="text-sm text-white/70">
              Sign in to manage your cart, update the catalog, or jump back into your dashboards.
            </p>
          </CardHeader>

          <CardContent className="mt-8 space-y-6 p-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-100">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@studio.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo-100">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>

            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="h-px w-full bg-white/20" />
              or
              <span className="h-px w-full bg-white/20" />
            </div>

            <Button
              asChild
              variant="ghost"
              className="w-full border border-white/20 bg-white/5 text-sm text-white"
            >
              <a href={googleAuthUrl} className="flex items-center justify-center gap-3">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M12 5.257c1.4 0 2.66.482 3.65 1.426l2.74-2.74C16.755 2.57 14.568 1.714 12 1.714 7.73 1.714 4.114 4.165 2.57 7.914l3.42 2.66C6.835 7.536 9.198 5.257 12 5.257"
                  />
                  <path
                    fill="#FBBC05"
                    d="M23.49 12.272c0-.907-.073-1.728-.207-2.543H12v4.812h6.454c-.26 1.33-1.05 2.46-2.216 3.226l3.46 2.686c2.024-1.869 3.296-4.624 3.296-8.181"
                  />
                  <path
                    fill="#4285F4"
                    d="M15.662 17.767C14.57 18.499 13.22 18.914 12 18.914c-3.229 0-5.974-2.177-6.94-5.151l-3.49 2.7c1.991 4.037 6.2 6.813 10.43 6.813 3.15 0 5.8-1.043 7.734-2.833l-3.072-2.676"
                  />
                  <path
                    fill="#34A853"
                    d="M5.06 13.763a6.91 6.91 0 0 1-.364-2.05c0-.713.13-1.4.346-2.05L1.622 6.974C.847 8.51.415 10.215.415 11.95c0 1.736.432 3.44 1.207 4.975l3.438-3.162"
                  />
                </svg>
                <span>Continue with Google</span>
              </a>
            </Button>

            <p className="text-center text-sm text-white/70">
              New to Laptomania?{" "}
              <Link to="/signup" className="font-semibold text-indigo-200 hover:underline">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </main>
  );
};

export default Login;
