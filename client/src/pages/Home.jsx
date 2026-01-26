import { useEffect, useMemo, useState } from "react";
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

const testimonials = [
  {
    quote:
      "Laptomania replaced three tools in our sourcing pipeline. Moderators now approve hardware in half the time while buyers enjoy cinematic previews.",
    name: "Noa Montoya",
    role: "Pipeline Lead · Nimbus FX",
    metric: "2x faster",
    initials: "NM",
  },
  {
    quote:
      "The gallery experience feels tactile even on a tablet. Creative directors sense the chassis before the courier ever rings the doorbell.",
    name: "Ivy Laurent",
    role: "Creative Director · Aurelia Labs",
    metric: "+31% QoQ",
    initials: "IL",
  },
  {
    quote:
      "Role-aware approvals + real-time stock signals keep our vendor catalog lean. No more spreadsheet drift or conflicting edits.",
    name: "Rahul Banerjee",
    role: "Marketplace Ops · Cloudform",
    metric: "0 churn",
    initials: "RB",
  },
  {
    quote:
      "From instant cart to inline analytics, every touchpoint feels premium yet practical. Our finance team and art directors finally agree on a tool.",
    name: "Mara Chen",
    role: "Procurement Strategist · Helio",
    metric: "+18% ROI",
    initials: "MC",
  },
];

const SLIDE_INTERVAL = 5200;
const TRANSITION_DURATION = 650;

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalSlides = testimonials.length;
  const extendedTestimonials = useMemo(() => (totalSlides ? [...testimonials, testimonials[0]] : testimonials), [totalSlides]);

  useEffect(() => {
    if (!totalSlides) return undefined;
    const id = setInterval(() => {
      setIsTransitioning(true);
      setActiveSlide(prev => prev + 1);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [totalSlides]);

  useEffect(() => {
    if (!totalSlides) return undefined;
    if (activeSlide === totalSlides) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setActiveSlide(0);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [activeSlide, totalSlides]);

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [isTransitioning]);

  const normalizedIndex = totalSlides ? activeSlide % totalSlides : 0;
  const sliderProgress = totalSlides ? ((normalizedIndex + 1) / totalSlides) * 100 : 0;

  const jumpToSlide = index => {
    if (!totalSlides) return;
    setIsTransitioning(true);
    setActiveSlide(index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-home)]" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[32px]">
          <HeroOrbit className="max-sm:opacity-60" />
          <Reveal>
            <div className="relative rounded-[32px] border border-[color:var(--surface-border)] bg-[color:var(--bg-elevated)]/90 p-6 text-[color:var(--text-primary)] shadow-xl sm:rounded-[48px] sm:p-10">
              <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-muted)]">Laptomania</p>
              <h1 className="mt-6 text-3xl font-black leading-tight text-[color:var(--text-primary)] sm:mt-8 sm:text-5xl">
                A design-forward laptop marketplace for collectors, creators, and crews.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-[color:var(--text-secondary)]">
                Discover refined hardware, manage inventory, and collaborate with your team using intelligent flows and
                beautifully crafted interfaces powered by Tailwind and shadcn-inspired components.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/laptops">
                  <Button size="lg" className="w-full min-w-[180px] bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)] sm:w-auto">
                    Explore laptops
                  </Button>
                </Link>
                <Link to="/panel">
                  <Button variant="ghost" size="lg" className="w-full min-w-[180px] border-[color:var(--surface-border)] text-[color:var(--text-primary)] sm:w-auto">
                    Go to panel
                  </Button>
                </Link>
              </div>

              <div className="mt-10 rounded-[32px] border border-[color:var(--surface-border)] bg-[color:var(--bg-inset)]/75 p-4">
                <Diorama />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(stat => (
            <Reveal key={stat.title} variant="up">
              <StatCard {...stat} className="text-[color:var(--text-primary)]" />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} variant={index === 1 ? "up" : index === 0 ? "right" : "left"}>
              <Card
                className={
                  index === 1
                    ? "bg-linear-to-br from-[color:var(--bg-elevated)]/90 via-[color:var(--bg-card)]/80 to-transparent"
                    : "bg-linear-to-br from-[color:var(--bg-card)] via-transparent to-transparent"
                }
              >
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-primary)]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[color:var(--text-secondary)]">{feature.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal variant="left">
            <Card className="bg-linear-to-br from-[color:var(--bg-card)] via-[color:var(--bg-elevated)]/80 to-transparent p-6 text-[color:var(--text-primary)] sm:p-8">
              <CardHeader className="p-0">
                <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-muted)]">Workflow</p>
                <CardTitle className="text-2xl text-[color:var(--text-primary)] sm:text-3xl">
                  Build your lineup in three cinematic steps.
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-6 space-y-8 p-0">
                {roadmap.map((step, index) => (
                  <div key={step.title} className="flex flex-col gap-4 sm:flex-row">
                    <span className="text-5xl font-black text-[color:var(--text-muted)]/60 sm:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">{step.title}</p>
                      <p className="text-lg font-semibold text-[color:var(--text-primary)]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal variant="right">
            <Card className="flex flex-col gap-6 bg-linear-to-br from-[color:var(--bg-elevated)] via-transparent to-transparent p-6 text-[color:var(--text-primary)] sm:p-8">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl text-[color:var(--text-primary)]">Admin panel preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-0 text-sm text-[color:var(--text-secondary)]">
                <p>
                  • Multi-image uploads with drag-and-drop ordering
                  <br />• Inline editing with optimistic UI
                  <br />• Real-time stock insights by brand
                  <br />• Protected routes for moderators
                  <br />• Detailed action logs (coming soon)
                </p>
                <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">Always-on design system</p>
                <p>
                  Powered by Tailwind v4, shadcn-inspired primitives, and accessible theme toggles. Light and dark modes
                  keep the experience polished in every environment.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <section className="rounded-[40px] border border-[color:var(--surface-border)] bg-[color:var(--bg-card)]/88 p-6 text-[color:var(--text-primary)] shadow-[var(--shadow-soft)] sm:p-12">
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="space-y-5 lg:w-2/5">
                  <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-muted)]">Testimonials</p>
                  <h2 className="text-3xl font-black sm:text-4xl">Workflow-obsessed teams feel at home.</h2>
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    Cinematic yet practical stories from the people who spec, approve, and deploy laptops at scale. Auto
                    advancing with manual control for when you want a closer look.
                  </p>
                  <div className="flex items-center gap-3 text-sm text-[color:var(--text-secondary)]">
                    <span className="inline-flex items-center rounded-full bg-[color:var(--accent-soft)]/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent-primary)]">
                      Auto glide
                    </span>
                    <span>5s cadence · tap a profile to jump ahead</span>
                  </div>
                </div>

                <div className="min-w-0 lg:w-3/5">
                  <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--surface-border)] bg-[color:var(--bg-elevated)]/70">
                    <div
                      className="flex"
                      style={{
                        transform: `translateX(-${activeSlide * 100}%)`,
                        transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
                      }}
                    >
                      {extendedTestimonials.map((testimonial, index) => (
                        <article key={`${testimonial.name}-${index}`} className="w-full flex-shrink-0 px-3 py-6 sm:px-6">
                          <div className="flex h-full flex-col gap-6 rounded-[28px] border border-[color:var(--surface-border)] bg-[color:var(--bg-card)]/92 p-5 sm:p-8">
                            <div className="flex items-center gap-4">
                              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--accent-soft)] text-sm font-semibold tracking-wide text-[color:var(--accent-primary)]">
                                {testimonial.initials}
                              </div>
                              <div>
                                <p className="font-semibold text-[color:var(--text-primary)]">{testimonial.name}</p>
                                <p className="text-sm text-[color:var(--text-muted)]">{testimonial.role}</p>
                              </div>
                              <span className="ml-auto rounded-full border border-[color:var(--accent-outline)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent-primary)]">
                                {testimonial.metric}
                              </span>
                            </div>
                            <p className="text-lg leading-relaxed text-[color:var(--text-secondary)]">“{testimonial.quote}”</p>
                            <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)]">
                              <span className="inline-flex items-center gap-1 text-[color:var(--accent-primary)]" aria-hidden>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                              </span>
                              <span>Verified experience</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[color:var(--bg-card)] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[color:var(--bg-card)] to-transparent" />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.name}
                      type="button"
                      onClick={() => jumpToSlide(index)}
                      className={`group rounded-2xl border px-4 py-2 text-left transition-all ${
                        normalizedIndex === index
                          ? "border-[color:var(--accent-outline)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-soft)]"
                          : "border-[color:var(--surface-border)] text-[color:var(--text-secondary)] hover:border-[color:var(--accent-outline)]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-[color:var(--text-primary)]">{testimonial.name}</p>
                      <p className="text-xs text-[color:var(--text-muted)]">{testimonial.role}</p>
                    </button>
                  ))}
                </div>

                  <div className="flex w-full flex-1 items-center gap-3 lg:justify-end">
                    <div className="relative h-1 w-full max-w-sm overflow-hidden rounded-full bg-[color:var(--surface-border)]/40">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--accent-primary)] transition-all duration-500"
                        style={{ width: `${sliderProgress}%` }}
                      />
                    </div>
                    <span className="rounded-full border border-[color:var(--surface-border)] px-3 py-1 text-xs uppercase tracking-[0.35em] text-[color:var(--text-muted)]">
                      {String(normalizedIndex + 1).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
                    </span>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Home;
