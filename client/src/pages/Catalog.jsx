import { useLaptop } from "../context/laptops.context";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input, Label, Textarea } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Reveal } from "../components/ui/reveal";

const LaptopDetails = ({ laptop, onClose }) => {
  if (!laptop || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:py-16">
        <div className="pointer-events-auto w-full max-w-4xl rounded-[32px] border border-white/15 bg-(--bg-card)/95 p-6 shadow-2xl dark:bg-slate-950 sm:rounded-[48px] sm:p-10">
          <button
            className="absolute right-5 top-5 rounded-full border border-slate-200/40 px-3 py-1 text-sm text-slate-300 hover:text-white dark:border-slate-700 sm:right-6 sm:top-6"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[32px] border border-white/15">
                <img src={laptop.images?.[0]?.url} alt={laptop.model} className="h-60 w-full object-cover sm:h-64" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {laptop.images?.slice(1, 4).map(image => (
                  <img key={image._id} src={image.url} alt={laptop.model} className="h-20 w-full rounded-[18px] object-cover" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-indigo-400">Laptop profile</p>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  {laptop.brand} {laptop.model}
                </h2>
                <p className="text-sm text-slate-300">{laptop.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm text-slate-200 sm:grid-cols-2">
                {[
                  ["Processor", laptop.processor],
                  ["Memory", laptop.ram],
                  ["Storage", laptop.storage],
                  ["Graphics", laptop.graphics],
                  ["Display", laptop.display],
                  ["OS", laptop.os],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
                    <p className="font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Price</p>
                  <p className="text-2xl font-bold text-white">${laptop.price}</p>
                </div>
                <Badge variant="default" className="text-xs">
                  In stock: {laptop.stock}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Laptop = ({ laptop, onOpenDetails }) => {
  const { deleteLaptop, updateLaptop, addToCart } = useLaptop();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  const editableFields = Object.keys(laptop).filter(
    key => !["_id", "__v", "createdAt", "updatedAt", "isAvailable", "images"].includes(key)
  );

  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await updateLaptop(laptop._id, formData);
    setEditing(false);
  };

  return (
    <Reveal>
      <Card className="flex h-full flex-col rounded-[28px] border border-(--border-subtle) bg-(--bg-card)/95 shadow-(--shadow-soft) dark:bg-slate-900/60 sm:rounded-[36px]">
        <CardHeader className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => onOpenDetails(laptop)}
            className="grid grid-cols-2 gap-3 rounded-[24px] border border-white/20 p-1 transition hover:border-indigo-300 sm:grid-cols-3"
          >
            {laptop.images.map(image => (
              <div key={image._id} className="overflow-hidden rounded-[18px] sm:rounded-[22px]">
                <img src={image.url} alt={laptop.model} className="h-28 w-full object-cover sm:h-32" />
              </div>
            ))}
          </button>
          <div>
            <CardTitle className="text-2xl text-white">
              {laptop.brand} {laptop.model}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {laptop.tagline || "Studio-grade performance wrapped in a portable chassis."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 text-sm text-slate-300">
          {editing ? (
            <form onSubmit={handleUpdate} className="grid gap-3 sm:grid-cols-2">
              {editableFields.map(key => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={`${laptop._id}-${key}`}>{key}</Label>
                  {key === "description" ? (
                    <Textarea id={`${laptop._id}-${key}`} name={key} defaultValue={laptop[key]} className="sm:col-span-2" />
                  ) : (
                    <Input id={`${laptop._id}-${key}`} type="text" name={key} defaultValue={laptop[key]} />
                  )}
                </div>
              ))}

              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <Button type="submit" className="flex-1 min-w-[150px]">
                  Save
                </Button>
                <Button type="button" variant="outline" className="flex-1 min-w-[150px]" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["Processor", laptop.processor],
                ["Memory", laptop.ram],
                ["Storage", laptop.storage],
                ["Graphics", laptop.graphics],
                ["Display", laptop.display],
                ["OS", laptop.os],
              ].map(([label, value]) => (
                <p key={label} className="text-sm">
                  <span className="text-white/60">{label}:</span> <span className="font-medium text-white">{value}</span>
                </p>
              ))}
              <p className="pt-2 text-sm text-slate-300 sm:col-span-2">{laptop.description}</p>
            </div>
          )}
        </CardContent>

        <div className="flex flex-col gap-4 rounded-b-[28px] border-t border-white/15 bg-white/5 p-5 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">${laptop.price}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Stock {laptop.stock}</p>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenDetails(laptop)}>
              View details
            </Button>
            {user?.role === "admin" ? (
              <>
                <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => deleteLaptop(laptop._id)}>
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setEditing(true)}>
                  Update
                </Button>
              </>
            ) : (
              <Button className="w-full min-w-[150px] sm:w-auto" onClick={() => addToCart(laptop)}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Reveal>
  );
};

const LaptopList = ({ onOpenDetails }) => {
  const { laptops } = useLaptop();

  if (!laptops?.length) {
    return (
      <Reveal>
        <div className="rounded-[32px] border border-dashed border-slate-200 bg-(--bg-card) p-10 text-center text-slate-500 sm:rounded-[40px]">
          No laptops found. Check back soon!
        </div>
      </Reveal>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {laptops.map(laptop => (
        <Laptop key={laptop._id} laptop={laptop} onOpenDetails={onOpenDetails} />
      ))}
    </section>
  );
};

const Catalog = () => {
  const { user } = useAuth();
  const [activeLaptop, setActiveLaptop] = useState(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,rgba(45,212,191,0.25),transparent_55%),radial-gradient(circle_at_90%_0%,rgba(99,102,241,0.28),transparent_45%),linear-gradient(180deg,#030712,#12172c)]" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 rounded-[32px] border border-white/15 bg-white/5 p-6 shadow-lg sm:rounded-[48px] sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.6em] text-indigo-300">Catalogue</p>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Curated laptops for every creator
              </h1>
              <p className="text-sm text-slate-300">
                {user ? `Signed in as ${user.email}` : "Explore the collection and find your next machine."}
              </p>
            </div>

            <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Need help deciding?</p>
              <p>Use the panel to manage inventory or add laptops to your cart.</p>
            </div>
          </div>
        </Reveal>

        <LaptopList onOpenDetails={setActiveLaptop} />
      </div>

      {activeLaptop && <LaptopDetails laptop={activeLaptop} onClose={() => setActiveLaptop(null)} />}
    </main>
  );
};

export default Catalog;
