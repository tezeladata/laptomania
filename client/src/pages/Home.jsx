import { Link } from "react-router";
import { Button } from "../components/UI/Button1";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card1";
import { StatCard } from "../components/UI/StatCard1";
import { Reveal } from "../components/UI/Reveal1";
import { HeroOrbit } from "../components/UI/HeroOrbit1";
import Diorama from "../components/UI/Diorama";

const stats = [
  { title: "Listings", value: "120+", description: "Curated and verified devices" },
  { title: "Creators", value: "3.2k", description: "Returning customers and collectors" },
  { title: "Uptime", value: "99.9%", description: "Role-secured management tools" },
];

const features = [
  {
    title: "Curated Catalog",
    description: "Browse engineering-grade devices with immersive galleries, complete specs, and live availability.",
  },
  {
    title: "Instant Cart",
    description: "Add laptops from anywhere, tweak quantities, and keep building without interrupting your flow.",
  },
  {
    title: "Role-aware Panel",
    description: "Moderators and admins maintain the marketplace with approvals, edits, and detailed logs.",
  },
];

const roadmap = [
  {
    title: "Discover",
    body: "Scroll curated collections, filter by creator type, and compare components in seconds.",
  },
  {
    title: "Decide",
    body: "Dive into immersive photography, real-time pricing, and nuanced descriptions before committing.",
  },
  {
    title: "Deploy",
    body: "Checkout (coming soon) or export selections for teams, classrooms, and production pipelines.",
  },
];

const Home = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(147,197,253,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.35),transparent_50%),linear-gradient(180deg,#050816,#0b1d3a)]" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[32px]">
          <HeroOrbit className="max-sm:opacity-60" />
          <Reveal>
            <div className="relative rounded-[32px] border border-white/20 bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 p-6 text-white shadow-xl sm:rounded-[48px] sm:p-10">
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">Laptomania</p>
              <h1 className="mt-6 text-3xl font-black leading-tight sm:mt-8 sm:text-5xl">
                A design-forward laptop marketplace for collectors, creators, and crews.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/80">
                Discover refined hardware, manage inventory, and collaborate with your team using intelligent flows and
                beautifully crafted interfaces powered by Tailwind and shadcn-inspired components.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/laptops">
                  <Button size="lg" className="w-full min-w-[180px] bg-white text-slate-900 hover:bg-white/90 sm:w-auto">
                    Explore laptops
                  </Button>
                </Link>
                <Link to="/panel">
                  <Button variant="ghost" size="lg" className="w-full min-w-[180px] border-white/30 sm:w-auto">
                    Go to panel
                  </Button>
                </Link>
              </div>

              <div className="mt-10 rounded-[32px] border border-white/15 bg-white/5 p-4 ">
                <Diorama />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(stat => (
            <Reveal key={stat.title} variant="up">
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} variant={index === 1 ? "up" : index === 0 ? "right" : "left"}>
              <Card
                className={
                  index === 1
                    ? "bg-linear-to-br from-white/20 via-white/5 to-transparent"
                    : "bg-linear-to-br from-white/15 via-white/0 to-transparent"
                }
              >
                <CardHeader>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal variant="left">
            <Card className="bg-linear-to-br from-white/15 via-white/5 to-transparent p-6 sm:p-8">
              <CardHeader className="p-0">
                <p className="text-xs uppercase tracking-[0.6em] text-indigo-200">Workflow</p>
                <CardTitle className="text-2xl text-white sm:text-3xl">
                  Build your lineup in three cinematic steps.
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 space-y-8 p-0">
                {roadmap.map((step, index) => (
                  <div key={step.title} className="flex flex-col gap-4 sm:flex-row">
                    <span className="text-5xl font-black text-white/30 sm:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-white/60">{step.title}</p>
                      <p className="text-lg font-semibold text-white">{step.body}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal variant="right">
            <Card className="flex flex-col gap-6 bg-linear-to-br from-indigo-200/30 via-white/10 to-transparent p-6 dark:from-white/5 dark:via-white/0 sm:p-8">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl text-white">Admin panel preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-0 text-sm text-white/80">
                <p>
                  • Multi-image uploads with drag-and-drop ordering
                  <br />• Inline editing with optimistic UI
                  <br />• Real-time stock insights by brand
                  <br />• Protected routes for moderators
                  <br />• Detailed action logs (coming soon)
                </p>
                <p className="text-xs uppercase tracking-[0.4em] text-indigo-200">Always-on design system</p>
                <p>
                  Powered by Tailwind v4, shadcn-inspired primitives, and accessible theme toggles. Light and dark modes
                  keep the experience polished in every environment.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Home;
