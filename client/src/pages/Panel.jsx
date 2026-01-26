import { useAuth } from "../context/auth.context";
import Catalog from "./Catalog";
import { useLaptop } from "../context/laptops.context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/UI/Card1";
import { Badge } from "../components/UI/Badge1";
import { StatCard } from "../components/UI/StatCard1";
import { Input, Label, Textarea } from "../components/UI/Input1";
import { Button } from "../components/UI/Button1";
import { Reveal } from "../components/UI/Reveal1";
import { useMemo } from "react";

const AddLaptop = () => {
  const { addLaptop } = useLaptop();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addLaptop(formData);
    e.target.reset();
  };

  return (
    <Reveal>
      <Card className="p-6 sm:p-8">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl text-[color:var(--text-primary)]">Add Laptop</CardTitle>
          <CardDescription>Upload gallery images, rich descriptions, and stock insights in one go.</CardDescription>
        </CardHeader>

        <CardContent className="mt-6 space-y-6 p-0">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-5 md:grid-cols-2">
            {[
              { name: "brand", placeholder: "Brand" },
              { name: "model", placeholder: "Model" },
              { name: "processor", placeholder: "Processor" },
              { name: "ram", placeholder: "RAM" },
              { name: "storage", placeholder: "Storage" },
              { name: "graphics", placeholder: "Graphics" },
              { name: "display", placeholder: "Display" },
              { name: "os", placeholder: "Operating System" },
            ].map(field => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.placeholder}</Label>
                <Input id={field.name} name={field.name} placeholder={field.placeholder} required />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" placeholder="Price" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" placeholder="Stock" required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows="3" placeholder="High-fidelity description" required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" type="file" name="images" multiple required />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Upload catalog entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Reveal>
  );
};

const Panel = () => {
  const { user } = useAuth();
  const { laptops } = useLaptop();

  const insights = useMemo(() => {
    const total = laptops.length;
    const premium = laptops.filter(l => Number(l.price) > 2000).length;
    const studios = laptops.filter(l => l.description?.toLowerCase().includes("studio")).length;
    return { total, premium, studios };
  }, [laptops]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-panel)]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 text-[color:var(--text-primary)]">
        <Reveal>
          <Card className="p-6 sm:p-8">
            <CardHeader className="p-0 space-y-2">
              <CardTitle className="text-3xl text-[color:var(--text-primary)]">Panel</CardTitle>
              <CardDescription>Manage catalog entries, monitor performance, and collaborate with your crew.</CardDescription>
            </CardHeader>

            <CardContent className="mt-6 grid gap-6 p-0 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[color:var(--text-muted)]">Full name</p>
                  <p className="text-xl font-semibold text-[color:var(--text-primary)]">{user.fullname}</p>
                </div>

                <div>
                  <p className="text-sm text-[color:var(--text-muted)]">Email address</p>
                  <p className="text-[color:var(--text-primary)]">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Role</p>
                  <Badge variant="default" className="mt-1">
                    {user.role}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-[color:var(--surface-border)]/50 bg-linear-to-br from-[color:var(--bg-card)] via-[color:var(--bg-elevated)]/80 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">Highlights</p>
                <ul className="space-y-2 text-sm text-[color:var(--text-secondary)]">
                  <li>• Secure access with protected routes</li>
                  <li>• Bulk editing via Catalog view</li>
                  <li>• Drag and drop media uploads</li>
                  <li>• Inline analytics (coming soon)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {(user.role === "admin" || user.role === "moderator") && (
          <>
            <Reveal>
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Total listings" value={insights.total} description="Active catalog entries" />
                <StatCard title="Premium" value={insights.premium} description=">$2k devices" />
                <StatCard title="Studios" value={insights.studios} description="Creative-grade picks" />
              </div>
            </Reveal>

            <AddLaptop />

            <Reveal>
              <section className="rounded-[32px] border border-transparent bg-transparent p-0 sm:rounded-[40px]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">Full catalog</h2>
                    <p className="text-sm text-[color:var(--text-secondary)]">
                      Inline edits instantly sync across the experience.
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">Live preview</p>
                </div>

                <div className="mt-6 overflow-hidden rounded-[28px] border border-[color:var(--surface-border)]/50 bg-linear-to-br from-[color:var(--bg-card)] to-transparent shadow-none">
                  <Catalog />
                </div>
              </section>
            </Reveal>
          </>
        )}
      </div>
    </main>
  );
};

export default Panel;
