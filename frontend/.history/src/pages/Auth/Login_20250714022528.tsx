import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { login as loginApi } from "../../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await loginApi({ email, password });
      localStorage.setItem("token", token);

      // AuthProvider.login also fetches /users/me and sets context
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        /* Backend should return a JSON with a message field */
        const msg =
          (err.response.data as { message?: string }).message ??
          "Invalid credentials. Please try again.";
        setError(msg);
      } else {
        setError("Unexpected error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
