import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import FormInput from "../../components/FormInput";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isPasswordStrong = (pwd: string) => {
    const conditions = [
      /.{8,}/.test(pwd),       // Min 8 characters
      /[A-Z]/.test(pwd),       // At least one uppercase
      /[a-z]/.test(pwd),       // At least one lowercase
      /[0-9]/.test(pwd),       // At least one digit
      /[\W_]/.test(pwd),       // At least one special char
    ];
    return conditions.filter(Boolean).length >= 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrong(password)) {
      setError("Password must be 8+ characters and include upper, lower, number & symbol.");
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
    <div className="min-h-screen flex justify-center items-center bg-background px-4 text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card text-foreground p-8 rounded-lg shadow space-y-5 border border-border"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <FormInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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

        {!isPasswordStrong(password) && password.length > 0 && (
          <p className="text-sm text-red-500">
            Password must include 4 of: uppercase, lowercase, number, symbol, and be 8+ characters.
          </p>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 font-medium underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
