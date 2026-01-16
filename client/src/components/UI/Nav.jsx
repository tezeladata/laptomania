import { Link } from 'react-router';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';
import { useLaptop } from '../../context/laptops.context';

const Nav = () => {
    const { user, logout } = useAuth();
    const { cart, addToCart, reduceOne, removeProduct, clearCart } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-xl sm:text-2xl font-extrabold text-indigo-600">
                    Laptomania
                    </Link>

                    <ul className="hidden md:flex items-center gap-2">
                    <li>
                        <Link className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" to="/">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" to="/laptops">
                        Laptops
                        </Link>
                    </li>
                    </ul>
                </div>

                <div>
                    {user ? (
                    <ul className="flex items-center gap-3 sm:gap-4">
                        <li
                        onClick={() => setIsOpen(true)}
                        className="relative cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                        >
                        Cart
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs font-semibold rounded-full px-2">
                            {cart.reduce((p, c) => p + c.quantity, 0)}
                            </span>
                        )}
                        </li>

                        <li>
                        <Link className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50" to="/panel">
                            Panel
                        </Link>
                        </li>

                        <li>
                        <button
                            onClick={logout}
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                        </li>
                    </ul>
                    ) : (
                    <ul className="flex items-center gap-3">
                        <li>
                        <Link className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600" to="/login">
                            Login
                        </Link>
                        </li>
                        <li>
                        <Link className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700" to="/signup">
                            Sign Up
                        </Link>
                        </li>
                    </ul>
                    )}
                </div>
                </div>
            </nav>

            {/* Cart sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                    ✕
                </button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
                {cart.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 mt-10">Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                    <div key={item._id} className="flex gap-3 pb-3 border-b">
                        <img src={item.images?.[0]?.url} className="w-16 h-16 rounded object-cover" />
                        <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-medium">
                            {item.brand} {item.model}
                        </h3>

                        <div className="flex items-center gap-2 text-sm">
                            <button onClick={() => reduceOne(item)} className="px-2 border rounded hover:bg-gray-100">−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="px-2 border rounded hover:bg-gray-100">+</button>
                        </div>

                        <p className="text-xs text-gray-600">Price ${item.price}</p>
                        <p className="text-xs text-gray-600">Total ${item.price * item.quantity}</p>

                        <button onClick={() => removeProduct(item)} className="text-xs text-red-500 hover:underline">
                            Remove
                        </button>
                        </div>
                    </div>
                    ))
                )}
                </div>
            </div>

            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 z-40" />
            )}
        </header>
    );
};

export default Nav;