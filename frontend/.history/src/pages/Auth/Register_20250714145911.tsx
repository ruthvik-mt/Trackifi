import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isPasswordStrong = (pwd: string) => {
    const conditions = [
      /.{8,}/.test(pwd),
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[\W_]/.test(pwd),
    ];
    return conditions.filter(Boolean).length >= 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrong(password)) {
      setError("Password must be 8+ characters with upper, lower, number & symbol.");
      return;
    }

    try {
      await axios.post("/api/auth/register", { fullName, email, password });
      navigate("/login");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        {!isPasswordStrong(password) && password.length > 0 && (
          <p className="text-sm text-red-500">
            Password must contain at least 4 of: uppercase, lowercase, number, special character, and 8+ length.
          </p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <div className="text-center text-sm">
          Already registered?{" "}
          <a href="/login" className="text-blue-600 underline">Login</a>
        </div>
      </form>
    </div>
  );
}
