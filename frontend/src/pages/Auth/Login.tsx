import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { motion } from "framer-motion";
import { Spinner } from "../../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setButtonLoading(true);

    try {
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials.");
      } else {
        setError("Login failed. Try again.");
      }
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background px-4 text-foreground relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggleButton />
      </div>

      {/* Animated Background Blob */}
      <div className="absolute -z-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-md bg-card/80 border border-border p-8 rounded-xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">Login to Trackifi</h2>

        <FormInput
          label="Email Address"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Show Spinner or Login Button */}
        {buttonLoading ? (
          <div className="flex justify-center items-center py-2">
            <Spinner size="lg" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition font-medium"
          >
            Login
          </button>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium underline">
            Register
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
