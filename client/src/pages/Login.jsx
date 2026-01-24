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

            <Button asChild variant="ghost" className="w-full border border-white/20 bg-white/5 text-sm text-white">
              <a href={googleAuthUrl}>Continue with Google</a>
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
