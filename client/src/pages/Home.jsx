const Home = () => {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                
                {/* Hero */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Welcome to Laptomania
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
                        Laptomania is your one-stop destination for browsing, managing, and purchasing laptops.
                        Explore a wide range of devices, compare specifications, and build your cart with ease.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Browse Laptops
                        </h3>
                        <p className="text-sm text-gray-600">
                            View detailed laptop listings including processor, RAM, storage, graphics, operating system,
                            display information, and pricing. All devices are presented in a clean and responsive catalog.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Shopping Cart
                        </h3>
                        <p className="text-sm text-gray-600">
                            Add laptops to your cart, adjust quantities, and review the total price instantly.
                            The cart sidebar allows quick access without leaving the page.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            User Accounts
                        </h3>
                        <p className="text-sm text-gray-600">
                            Create an account to manage your shopping experience. Logged-in users can access their panel,
                            view account details, and interact with the platform securely.
                        </p>
                    </div>
                </div>

                {/* Admin info */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Admin & Moderator Panel
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Users with administrative or moderator roles have access to advanced management tools.
                        From the panel, authorized users can add new laptops, update existing listings,
                        manage stock levels, and remove outdated products.
                    </p>
                    <p className="text-gray-600">
                        This role-based access ensures that the catalog remains accurate, up to date,
                        and well organized for all visitors.
                    </p>
                </div>

                {/* Footer note */}
                <div className="text-center text-sm text-gray-500">
                    Browse freely, sign up to unlock full features, and manage laptops efficiently with Laptomania.
                </div>

            </div>
        </section>
    );
};

export default Home;