import { useLaptop } from "../context/laptops.context.jsx";
import { useAuth } from "../context/auth.context.jsx";
import { useState } from "react";

const Products = () => {
  const { laptops, deleteLaptops, updateLaptops } = useLaptop();
  const { user } = useAuth();

  const [isUpdating, setIsUpdating] = useState(false);
  const [productId, setProductId] = useState(null);
  const [formData, setFormData] = useState({});

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Laptops</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {laptops.map((laptop) => {
          const isOutOfStock = laptop.stock === 0;
          const isLowStock = laptop.stock > 0 && laptop.stock <= 5;
          const isAdmin =
            user?.role === "admin" || user?.role === "moderator";

          return (
            <div
              key={laptop._id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition flex flex-col"
            >
              {/* Images */}
              <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
                <div className="flex overflow-x-auto snap-x snap-mandatory">
                  {laptop.images.map((image, index) => (
                    <div
                      key={index}
                      className="h-56 w-full flex-shrink-0 snap-center flex items-center justify-center"
                    >
                      <img
                        src={image.url}
                        alt={`${laptop.brand} ${laptop.model} ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                {isOutOfStock && (
                  <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                    Out of stock
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {laptop.brand} {laptop.model}
                </h2>

                {/* Specs */}
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>Processor: {laptop.processor}</p>
                  <p>RAM: {laptop.ram}</p>
                  <p>Storage: {laptop.storage}</p>
                  <p>Graphics: {laptop.graphics}</p>
                  <p>Display: {laptop.display}</p>

                  <p className="mt-3 text-xl font-bold text-gray-900">
                    ${laptop.price}
                  </p>

                  <p
                    className={`text-sm font-medium ${
                      isOutOfStock
                        ? "text-red-600"
                        : isLowStock
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of stock"
                      : isLowStock
                      ? `Low stock (${laptop.stock})`
                      : `In stock (${laptop.stock})`}
                  </p>
                </div>

                {/* Add to cart */}
                <button
                  disabled={isOutOfStock}
                  className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    !isOutOfStock
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {!isOutOfStock ? "Add to cart" : "Unavailable"}
                </button>

                {/* Admin buttons */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => {
                        setIsUpdating(true);
                        setProductId(laptop._id);
                        setFormData({
                          brand: laptop.brand,
                          model: laptop.model,
                          processor: laptop.processor,
                          ram: laptop.ram,
                          storage: laptop.storage,
                          graphics: laptop.graphics,
                          display: laptop.display,
                          price: laptop.price,
                          stock: laptop.stock,
                        });
                      }}
                      className="mt-2 w-full rounded-xl border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteLaptops(laptop._id)}
                      className="mt-2 w-full rounded-xl border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </>
                )}

                {/* Update form */}
                {isUpdating && productId === laptop._id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateLaptops(productId, {
                        ...formData,
                        price: Number(formData.price),
                        stock: Number(formData.stock),
                      });
                      setIsUpdating(false);
                      setProductId(null);
                    }}
                    className="mt-4 space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    {[
                      "brand",
                      "model",
                      "processor",
                      "ram",
                      "storage",
                      "graphics",
                      "display",
                    ].map((field) => (
                      <input
                        key={field}
                        type="text"
                        value={formData[field] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={field}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    ))}

                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />

                    <input
                      type="number"
                      placeholder="Stock"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsUpdating(false)}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Products;