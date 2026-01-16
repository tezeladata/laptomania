import { useLaptop } from "../context/laptops.context.jsx";
import { useAuth } from "../context/auth.context.jsx";
import { useState } from "react";

const Laptop = ({ laptop }) => {
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
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {laptop.images.map(image => (
          <img
            key={image._id}
            src={image.url}
            alt={laptop.model}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          {editableFields.map(key => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-500">{key}</label>
              <input
                type="text"
                name={key}
                defaultValue={laptop[key]}
                className="border rounded px-3 py-2"
              />
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{laptop.brand} - {laptop.model}</h2>

          <p className="text-sm text-gray-600">Processor: {laptop.processor}</p>
          <p className="text-sm text-gray-600">RAM/Storage: {laptop.ram}/{laptop.storage}</p>
          <p className="text-sm text-gray-600">Graphics: {laptop.graphics}</p>
          <p className="text-sm text-gray-600">Display: {laptop.display}</p>
          <p className="text-sm text-gray-600">OS: {laptop.os}</p>

          <p className="mt-2 text-sm text-gray-700">{laptop.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium text-sm">
              ${laptop.price} · Stock {laptop.stock}
            </span>

            {user?.role === "admin" ? (
              <div className="flex gap-2">
                <button
                  onClick={() => deleteLaptop(laptop._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(laptop)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const LaptopList = () => {
  const { laptops } = useLaptop();

  if (!laptops?.length) {
    return <p className="text-gray-500">No laptops found.</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {laptops.map(laptop => (
        <Laptop key={laptop._id} laptop={laptop} />
      ))}
    </section>
  );
};

const Catalog = () => {
  const { user } = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Laptops</h1>
        <span className="text-sm text-gray-600">
          {user ? `Signed in as ${user.email}` : "Browse"}
        </span>
      </div>

      <LaptopList />
    </main>
  );
};

export default Catalog;