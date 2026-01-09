import { useAuth } from "../context/auth.context.jsx";
import Catalog from "./Catalog.jsx";
import {useLaptop} from "../context/laptops.context.jsx";

const AddLaptop = () => {
    const { addLaptop } = useLaptop();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        addLaptop(formData);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow" >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Laptop</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-3">
                <input name="brand" placeholder="Brand" className="border rounded px-2 py-1" required />
                <input name="model" placeholder="Model" className="border rounded px-2 py-1" required />
                <input name="processor" placeholder="Processor" className="border rounded px-2 py-1" required />
                <input name="ram" placeholder="RAM" className="border rounded px-2 py-1" required />
                <input name="storage" placeholder="Storage" className="border rounded px-2 py-1" required />
                <input name="graphics" placeholder="Graphics" className="border rounded px-2 py-1" required />
                <input name="display" placeholder="Display" className="border rounded px-2 py-1" required />
                <input name="os" placeholder="Operating System" className="border rounded px-2 py-1" required />
                <input name="price" type="number" placeholder="Price" className="border rounded px-2 py-1" required />
                <input name="stock" type="number" placeholder="Stock" className="border rounded px-2 py-1" required />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="border rounded px-2 py-1"
                    rows="3"
                    required
                />
                    <input
                    type="file"
                    name="images"
                    multiple
                    className="border rounded px-2 py-1"
                    required
                />

                <button
                    type="submit"
                    className="mt-3 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                    >
                    Submit
                </button>
            </form>
        </div>
    );
};

const Panel = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col items-center gap-8">
      {/* Panel card */}
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Panel
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full name</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.fullname}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email address</p>
            <p className="text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Admin / Moderator content */}
      {(user.role === "admin" || user.role === "moderator") && (
        <>
          <div className="w-full max-w-7xl">
            <Catalog />
          </div>

          <div className="w-full max-w-7xl">
            <AddLaptop />
          </div>
        </>
      )}
    </main>
  );
};


export default Panel;