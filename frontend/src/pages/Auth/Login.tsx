import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { motion } from "framer-motion";
import { Spinner } from "../../components/Spinner";
import { Home, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 text-foreground relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />

      {/* Header Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-background/80 transition-all text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <ThemeToggleButton />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Log in to your Trackifi account</p>
          </div>

          <div className="space-y-4">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
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
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-destructive text-xs font-medium text-center bg-destructive/10 py-2 rounded-md"
            >
              {error}
            </motion.p>
          )}

          {buttonLoading ? (
            <div className="flex justify-center items-center py-2">
              <Spinner size="lg" />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-md active:scale-[0.98]"
            >
              Log In
            </button>
          )}

          <div className="text-center text-sm text-muted-foreground pt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline transition-all">
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
