import { Link } from 'react-router';
import { useAuth } from '../../context/auth.context';
import { useState } from 'react';
import { useLaptop } from '../../context/laptops.context';

const Nav = () => {
    const { user, logout } = useAuth();
    const { cart, addToCart, reduceOne, removeProduct, clearCart } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow relative">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
                            Laptomania
                        </Link>
                        <ul className="hidden md:flex ml-8 space-x-4">
                            <li>
                                <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/laptops" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Laptops
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center">
                        {user ? (
                            <ul className="flex items-center space-x-4">
                                <li
                                    onClick={() => setIsOpen(true)}
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer relative"
                                >
                                    Cart
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1.5">
                                            {
                                                cart.reduce((prev, cur) => prev + cur.quantity, 0)
                                            }
                                        </span>
                                    )}
                                </li>
                                <li>
                                    <Link to="/panel" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Panel
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex items-center space-x-4">
                                <li>
                                    <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            {/* 🛒 Cart Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        X
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center mt-8">
                            Your cart is empty.
                        </p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center space-x-3 border-b pb-3"
                            >
                                <img
                                    src={item.images?.[0]?.url}
                                    alt={item.model}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800 text-sm">
                                        {item.brand} {item.model}
                                    </h3>
                                    <p className="text-gray-600 text-sm flex items-center gap-2">
                                        Quantity:
                                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                            <button
                                                onClick={() => reduceOne(item)}
                                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
                                            >
                                                −
                                            </button>
                                            <span className="px-3 text-gray-800 text-sm select-none">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </p>

                                    <p className="text-gray-600 text-sm">price ${item.price}</p>
                                    <p className="text-gray-600 text-sm">Full price ${item.price * item.quantity}</p>

                                    <button onClick={() => removeProduct(item)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Overlay (click to close) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                />
            )}
        </header>
    );
};

export default Nav;