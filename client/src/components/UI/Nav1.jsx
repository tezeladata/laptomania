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
  <div className="flex gap-3 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--bg-card)] p-3 shadow-sm">
    <div className="h-16 w-16 overflow-hidden rounded-xl bg-[color:var(--bg-inset)]">
      <img src={item.images?.[0]?.url} alt={`${item.brand} ${item.model}`} className="h-full w-full object-cover" />
    </div>

    <div className="flex flex-1 flex-col text-sm">
      <div className="font-semibold text-[color:var(--text-primary)]">
        {item.brand} {item.model}
      </div>

      <p className="text-xs text-[color:var(--text-secondary)]">${item.price} each</p>

      <div className="mt-2 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 rounded-full border-[color:var(--surface-border)] p-0"
          onClick={() => reduceOne(item)}
        >
          &minus;
        </Button>
        <span className="w-6 text-center font-semibold text-[color:var(--text-primary)]">{item.quantity}</span>
        <Button size="sm" className="h-8 w-8 rounded-full p-0" onClick={() => addToCart(item)}>
          +
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[color:var(--text-muted)]">
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
          className={`absolute inset-0 bg-black/60 backdrop-blur-lg transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        <div className="absolute inset-y-0 right-0 flex w-full justify-end sm:w-auto sm:max-w-xl">
          <div
            className={`flex h-full w-full max-w-xl flex-col border-l border-[color:var(--surface-border)] bg-[color:var(--bg-card)] p-6 text-[color:var(--text-primary)] shadow-2xl transition-all duration-300 ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">Your Cart</p>
                <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">
                  {hasItems ? `${totalItems} item${totalItems > 1 ? "s" : ""}` : "It's empty"}
                </h2>
              </div>

              <Button variant="ghost" onClick={onClose} className="rounded-full text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]">
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
                <div className="rounded-2xl border border-dashed border-[color:var(--surface-border)] bg-[color:var(--bg-inset)] p-8 text-center text-sm text-[color:var(--text-secondary)]">
                  Discover a laptop you love and add it to your cart.
                </div>
              )}
            </div>

            {hasItems && (
              <div className="mt-6 space-y-4 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--bg-inset)] p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--text-secondary)]">Estimated total</span>
                  <span className="text-lg font-semibold text-[color:var(--text-primary)]">${totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[color:var(--text-muted)]">
                  Taxes and shipping calculated at checkout.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="flex-1 rounded-full bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]">
                    Checkout (coming soon)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-rose-300 text-rose-500 hover:bg-rose-500/10"
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
            <Button
              variant="ghost"
              className="hover-static rounded-full border border-[color:var(--surface-border)] px-5 text-[color:var(--text-primary)]"
            >
              Panel
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            className="rounded-full bg-[color:var(--accent-primary)] px-6 text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]"
          >
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Link to="/login">
          <Button
            variant="ghost"
            className="rounded-full px-5 text-[color:var(--text-primary)] hover:bg-[color:var(--accent-soft)]"
          >
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="rounded-full bg-[color:var(--accent-primary)] px-6 text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]">
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
              className="w-full rounded-full border-[color:var(--surface-border)] text-[color:var(--text-primary)]"
              onClick={() => {
                setIsOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              View cart
            </Button>
          )}

          <Link to="/panel" onClick={onNavigate}>
            <Button variant="ghost" className="w-full rounded-full border border-[color:var(--surface-border)] text-[color:var(--text-primary)]">
              Panel
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            className="w-full rounded-full bg-[color:var(--accent-primary)] px-6 text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]"
          >
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <Link to="/login" onClick={onNavigate}>
          <Button
            variant="ghost"
            className="w-full rounded-full border border-[color:var(--surface-border)] text-[color:var(--text-primary)] hover:bg-[color:var(--accent-soft)]"
          >
            Login
          </Button>
        </Link>

        <Link to="/signup" onClick={onNavigate}>
          <Button className="w-full rounded-full bg-[color:var(--accent-primary)] px-6 text-[color:var(--accent-primary-foreground)] hover:bg-[color:var(--accent-primary-hover)]">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[color:var(--surface-border)] bg-[color:var(--nav-gradient)] text-[color:var(--text-primary)] backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4 sm:gap-6">
            <Link to="/" className="text-2xl font-black tracking-tight text-[color:var(--text-primary)]" onClick={onNavigate}>
              Laptomania
            </Link>

            <div className="hidden md:flex">
              <ul className="flex items-center gap-1 rounded-full bg-[color:var(--bg-inset)]/60 p-1 text-sm font-medium text-[color:var(--text-secondary)]">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `rounded-full px-4 py-2 transition ${
                          isActive
                            ? "bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)]"
                            : "hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--text-primary)]"
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
                    className="relative hidden rounded-full border border-[color:var(--surface-border)] px-5 text-[color:var(--text-primary)] md:inline-flex"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="mr-2">Cart</span>
                    {itemsInCart > 0 && (
                      <span className="absolute -right-2 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-[color:var(--accent-primary-foreground)]">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--surface-border)] text-[color:var(--text-primary)] md:hidden"
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
        <div className="md:hidden border-t border-[color:var(--surface-border)] bg-[color:var(--bg-muted-accent)]/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6">
            <nav className="flex flex-col gap-2 text-sm font-medium text-[color:var(--text-primary)]">
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 transition ${
                      isActive
                        ? "bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)]"
                        : "bg-[color:var(--bg-card)]/60"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--bg-card)]/70 px-4 py-3 text-sm text-[color:var(--text-secondary)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">Appearance</p>
                  <p className="text-base font-semibold text-[color:var(--text-primary)]">Theme</p>
                </div>
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-6 border-t border-[color:var(--surface-border)] pt-6">{renderMobileActions()}</div>
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
