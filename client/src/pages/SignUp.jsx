import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card1";
import { Input, Label } from "../components/UI/Input1";
import { Button } from "../components/UI/Button1";
import { Link } from "react-router";
import { Reveal } from "../components/UI/Reveal1";

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, handleChange] = useForm({ fullname: "", email: "", password: "" });
  const apiBaseUrl = (import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");
  const googleAuthUrl = `${apiBaseUrl}/api/oauth/google`;
  const githubAuthUrl = `${apiBaseUrl}/api/oauth/github`;

  const handleSubmit = e => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-signup)]" />

      <Reveal>
        <Card className="mx-auto w-full max-w-xl bg-[color:var(--bg-card)]/85 p-6 text-[color:var(--text-primary)] backdrop-blur sm:max-w-2xl sm:p-10">
          <CardHeader className="space-y-3 p-0">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">Join</p>
            <CardTitle className="text-3xl text-[color:var(--text-primary)]">Create an account</CardTitle>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Unlock curated wishlists, personalized collections, and the management panel tailored to your role.
            </p>
          </CardHeader>

          <CardContent className="mt-8 p-0 text-[color:var(--text-primary)]">
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fullname" className="text-[color:var(--text-muted)]">
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
                <Label htmlFor="email" className="text-[color:var(--text-muted)]">
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
                <Label htmlFor="password" className="text-[color:var(--text-muted)]">
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

            <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
              <span className="h-px w-full bg-[color:var(--surface-border)]" />
              or
              <span className="h-px w-full bg-[color:var(--surface-border)]" />
            </div>

            <Button
              asChild
              variant="ghost"
              className="mt-4 w-full border border-[color:var(--surface-border)] bg-[color:var(--bg-inset)] text-sm text-[color:var(--text-primary)]"
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

            <Button
              asChild
              variant="ghost"
              className="mt-4 w-full border border-[color:var(--surface-border)] bg-[color:var(--bg-inset)] text-sm text-[color:var(--text-primary)]"
            >
              <a href={githubAuthUrl} className="flex items-center justify-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.85 10.911c.574.107.783-.248.783-.553 0-.272-.01-.995-.015-1.953-3.192.694-3.868-1.54-3.868-1.54-.522-1.327-1.276-1.68-1.276-1.68-1.043-.713.079-.698.079-.698 1.153.081 1.761 1.185 1.761 1.185 1.025 1.755 2.69 1.248 3.345.954.104-.743.401-1.248.728-1.535-2.549-.289-5.228-1.274-5.228-5.67 0-1.252.447-2.276 1.182-3.077-.118-.29-.512-1.453.112-3.03 0 0 .964-.308 3.16 1.175a10.89 10.89 0 0 1 5.756 0c2.195-1.483 3.158-1.175 3.158-1.175.626 1.577.232 2.74.114 3.03.737.801 1.18 1.825 1.18 3.077 0 4.407-2.683 5.378-5.242 5.663.413.354.781 1.05.781 2.118 0 1.528-.014 2.761-.014 3.138 0 .308.206.665.79.552A11.503 11.503 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5"
                    fill="currentColor"
                  />
                </svg>
                <span>Continue with GitHub</span>
              </a>
            </Button>

            <p className="mt-6 text-center text-sm text-[color:var(--text-secondary)]">
              Already joined?{" "}
              <Link to="/login" className="font-semibold text-[color:var(--accent-primary)] hover:underline">
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
