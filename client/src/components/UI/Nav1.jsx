import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/auth.context";
import { useLaptop } from "../../context/laptops.context";
import { Button } from "./Button1";
import { ThemeToggle } from "./ThemeToggle1";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Laptops", href: "/laptops" },
  { label: "Panel", href: "/panel" },
];

const CartItem = ({ item, reduceOne, addToCart, removeProduct }) => (
  <div className="flex gap-3 rounded-2xl border border-(--border-subtle) bg-(--bg-card) p-3 shadow-sm">
    <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
      <img src={item.images?.[0]?.url} alt={`${item.brand} ${item.model}`} className="h-full w-full object-cover" />
    </div>

    <div className="flex flex-1 flex-col text-sm">
      <div className="font-semibold text-slate-900 dark:text-slate-100">
        {item.brand} {item.model}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">${item.price} each</p>

      <div className="mt-2 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 rounded-full border-slate-200 p-0 dark:border-slate-700"
          onClick={() => reduceOne(item)}
        >
          &minus;
        </Button>
        <span className="w-6 text-center font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
        <Button size="sm" className="h-8 w-8 rounded-full p-0" onClick={() => addToCart(item)}>
          +
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Total ${item.price * item.quantity}</span>
        <button onClick={() => removeProduct(item)} className="text-rose-500 hover:text-rose-600">
          Remove
        </button>
      </div>
    </div>
  </div>
);

const CartPortal = ({ children }) => {
  const [container, setContainer] = useState(null);
  useEffect(() => {
    let el = document.getElementById("cart-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "cart-root";
      document.body.appendChild(el);
    }
    setContainer(el);
  }, []);

  if (!container) return null;
  return createPortal(children, container);
};

const CartPanel = ({ cart, isOpen, onClose, reduceOne, addToCart, removeProduct, clearCart }) => {
  const hasItems = cart.length > 0;
  const totalItems = cart.reduce((p, c) => p + c.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartPortal>
      <div className={`fixed inset-0 z-40 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-lg transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        <div className="absolute inset-y-0 right-0 flex w-full justify-end sm:w-auto sm:max-w-xl">
          <div
            className={`flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-(--bg-card) p-6 text-slate-900 shadow-2xl transition-all duration-300 dark:bg-slate-900 dark:text-white ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Your Cart</p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {hasItems ? `${totalItems} item${totalItems > 1 ? "s" : ""}` : "It's empty"}
                </h2>
              </div>

              <Button variant="ghost" onClick={onClose} className="rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-300">
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-4 overflow-y-auto pr-2" style={{ maxHeight: "65vh" }}>
              {hasItems ? (
                cart.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    reduceOne={reduceOne}
                    addToCart={addToCart}
                    removeProduct={removeProduct}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-(--border-subtle) bg-(--bg-card) p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  Discover a laptop you love and add it to your cart.
                </div>
              )}
            </div>

            {hasItems && (
              <div className="mt-6 space-y-4 rounded-2xl border border-(--border-subtle) bg-(--bg-card) p-5">
                <div className="flex items-center justify-between text-sm">
                  <span>Estimated total</span>
                  <span className="text-lg font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Taxes and shipping calculated at checkout.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="flex-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90">
                    Checkout (coming soon)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-rose-300 text-rose-400 hover:bg-rose-500/10"
                    onClick={clearCart}
                  >
                    Clear cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CartPortal>
  );
};

const Nav = () => {
  const { user, logout } = useAuth();
  const { cart, addToCart, reduceOne, removeProduct, clearCart } = useLaptop();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const shouldLockScroll = isOpen || isMobileMenuOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";

    if (isOpen) {
      document.documentElement.style.setProperty("--page-blur", "blur(12px)");
    } else {
      document.documentElement.style.setProperty("--page-blur", "none");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.removeProperty("--page-blur");
    };
  }, [isOpen, isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const onNavigate = () => setIsMobileMenuOpen(false);

  const renderDesktopActions = () => {
    if (user) {
      return (
        <>
          <Link to="/panel">
            <Button variant="ghost" className="hover-static rounded-full border border-white/30 px-5 text-white">
              Panel
            </Button>
          </Link>

          <Button onClick={handleLogout} className="rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Link to="/login">
          <Button variant="ghost" className="rounded-full px-5 text-white hover:bg-white/20">
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  const renderMobileActions = () => {
    if (user) {
      return (
        <div className="flex flex-col gap-3">
          {user.role === "user" && (
            <Button
              variant="outline"
              className="w-full rounded-full border-white/40 text-white"
              onClick={() => {
                setIsOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              View cart
            </Button>
          )}

          <Link to="/panel" onClick={onNavigate}>
            <Button variant="ghost" className="w-full rounded-full border border-white/10 text-white">
              Panel
            </Button>
          </Link>

          <Button onClick={handleLogout} className="w-full rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <Link to="/login" onClick={onNavigate}>
          <Button variant="ghost" className="w-full rounded-full border border-white/20 text-white hover:bg-white/10">
            Login
          </Button>
        </Link>

        <Link to="/signup" onClick={onNavigate}>
          <Button className="w-full rounded-full bg-white px-6 text-slate-900 hover:bg-white/90">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-linear-to-r from-slate-900/95 via-indigo-900/90 to-slate-800/80 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4 sm:gap-6">
            <Link to="/" className="text-2xl font-black tracking-tight text-white" onClick={onNavigate}>
              Laptomania
            </Link>

            <div className="hidden md:flex">
              <ul className="flex items-center gap-1 rounded-full bg-white/10 p-1 text-sm font-medium text-white/70">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `rounded-full px-4 py-2 transition ${
                          isActive ? "bg-white text-slate-900" : "hover:bg-white/20 hover:text-white"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {user?.role === "user" && (
                <>
                  <Button
                    variant="ghost"
                    className="relative hidden rounded-full border border-white/30 px-5 text-white md:inline-flex"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="mr-2">Cart</span>
                    {itemsInCart > 0 && (
                      <span className="absolute -right-2 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold">
                        {itemsInCart}
                      </span>
                    )}
                  </Button>

                </>
              )}

              <ThemeToggle />

              <div className="hidden items-center gap-2 md:flex">{renderDesktopActions()}</div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[rgba(15,23,42,0.95)] backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6">
            <nav className="flex flex-col gap-2 text-sm font-medium text-white">
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 transition ${isActive ? "bg-white text-slate-900" : "bg-white/5"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">Appearance</p>
                  <p className="text-base font-semibold text-white">Theme</p>
                </div>
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">{renderMobileActions()}</div>
          </div>
        </div>
      )}

      {user?.role === "user" && (
        <CartPanel
          cart={cart}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reduceOne={reduceOne}
          addToCart={addToCart}
          removeProduct={removeProduct}
          clearCart={clearCart}
        />
      )}
    </header>
  );
};

export default Nav;
