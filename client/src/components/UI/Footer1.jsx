import { Link } from "react-router";
import { Button } from "./Button1";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Laptops", href: "/laptops" },
      { label: "Panel", href: "/panel" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Support", href: "#support" },
      { label: "Changelog", href: "#changelog" },
      { label: "Guides", href: "#guides" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-[color:var(--surface-border)] bg-[color:var(--footer-gradient)] text-[color:var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="mx-auto max-w-6xl px-4 py-12 relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-black tracking-tight">Laptomania</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Cinematic catalogs for laptop collectors, creators, and crews. Built with Tailwind, shadcn-inspired
              primitives, and a love for tactile UI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/laptops">
                <Button size="sm" className="rounded-full bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]">
                  Explore laptops
                </Button>
              </Link>
              <Link to="/panel">
                <Button variant="ghost" size="sm" className="rounded-full border border-[color:var(--surface-border)] text-[color:var(--text-primary)]">
                  Admin panel
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 text-[color:var(--text-primary)]">
            {footerLinks.map(section => (
              <div key={section.title}>
                <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">{section.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-secondary)]">
                  {section.links.map(link => (
                    <li key={link.label}>
                      {link.href.startsWith("#") ? (
                        <a href={link.href} className="transition hover:text-[color:var(--text-primary)]">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="transition hover:text-[color:var(--text-primary)]">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">Stay in the loop</p>
              <p className="mt-4 text-sm text-[color:var(--text-secondary)]">
                Fresh drops, panel updates, and creator-grade inspiration. Sent occasionally.
              </p>
              <form className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="you@studio.com"
                  className="h-11 flex-1 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--bg-inset)] px-4 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent-outline)] focus:outline-none"
                />
                <Button className="rounded-2xl bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]">
                  Join
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--surface-border)] pt-6 text-xs text-[color:var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Laptomania. Crafted for Group 58 & friends.</p>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text-secondary)]">
            {socials.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="hover:text-[color:var(--text-primary)]">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
