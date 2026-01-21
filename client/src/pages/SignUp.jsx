import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card";
import { Input, Label } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Link } from "react-router";
import { Reveal } from "../components/UI/Reveal";

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, handleChange] = useForm({ fullname: "", email: "", password: "" });

  const handleSubmit = e => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(249,115,22,0.25),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.3),transparent_50%),linear-gradient(150deg,#05080f,#101b34)]" />

      <Reveal>
        <Card className="mx-auto w-full max-w-xl bg-white/10 p-6 text-white backdrop-blur sm:max-w-2xl sm:p-10">
          <CardHeader className="space-y-3 p-0">
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Join</p>
            <CardTitle className="text-3xl text-white">Create an account</CardTitle>
            <p className="text-sm text-white/70">
              Unlock curated wishlists, personalized collections, and the management panel tailored to your role.
            </p>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fullname" className="text-indigo-100">
                  Full name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  name="fullname"
                  placeholder="Taylor Nova"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-100">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="taylor@nova.io"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo-100">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-white/70">
              Already joined?{" "}
              <Link to="/login" className="font-semibold text-indigo-200 hover:underline">
                Return to login
              </Link>
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </main>
  );
};

export default SignUp;
