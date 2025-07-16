// src/components/Navbar.tsx
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white p-4 border-b">
      <h1 className="text-xl font-bold">Finance Tracker</h1>
      <div className="flex items-center space-x-4">
        {user && <span className="text-gray-700">Hello, {user.name}</span>}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
