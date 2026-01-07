import { useAuth } from "../context/auth.context.jsx";

const Panel = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Panel
        </h1>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="text-sm text-gray-500">Full name</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.fullname}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-500">Email address</p>
            <p className="text-gray-800">{user.email}</p>
          </div>

          {/* Role */}
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Panel;
