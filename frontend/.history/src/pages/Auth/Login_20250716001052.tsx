import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton"; // ✅ Import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials.");
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background px-4 text-foreground relative">
      {/* ✅ Theme Toggle at top-right */}
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card text-foreground p-8 rounded-lg shadow space-y-5 border border-border"
      >
        <h2 className="text-2xl font-bold text-center">Login to FinShape</h2>

        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
