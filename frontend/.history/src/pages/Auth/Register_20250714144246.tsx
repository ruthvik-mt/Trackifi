import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios"; // ✅ import isAxiosError
import api from "../../axios"; // ✅ your custom Axios instance

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await api.post("/api/auth/register", {
        fullName,
        email,
        password,
      });
      navigate("/login");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed. Try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Register
        </h2>

        <input
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          required
        />

        <input
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <input
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {/* Password validation feedback */}
        {password.length > 0 && password.length < 6 && (
          <p className="text-yellow-600 text-sm">
            Password must be at least 6 characters
          </p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
