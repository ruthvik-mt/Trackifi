import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { motion } from "framer-motion";
import { Spinner } from "../../components/Spinner";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!isPasswordStrong(password)) {
      setError("Password must be 8+ characters and include upper, lower, number & symbol.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/api/auth/register", {
        fullName,
        email,
        password,
      });
      setSuccess(true);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const serverMessage = error.response?.data?.message;
      setError(serverMessage || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background px-4 text-foreground relative overflow-hidden">
      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggleButton />
      </div>

      {/* Background glow */}
      <div className="absolute -z-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-md bg-card/80 border border-border p-8 rounded-xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>

        {success ? (
          <>
            <p className="text-green-600 text-center">
              Registration successful! Please check your inbox to verify your email.
            </p>
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Go to Email to Verify
            </a>
            <div className="text-center text-sm text-muted-foreground pt-2">
              After verification, you can{" "}
              <Link to="/login" className="underline text-blue-600 font-medium">login here</Link>.
            </div>
          </>
        ) : (
          <>
            <FormInput
              label="Full Name"
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <FormInput
              label="Email Address"
              type="email"
              placeholder="E-mail address"
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

            {password.length > 0 && (
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className={/.{8,}/.test(password) ? "text-green-600" : "text-red-500"}>
                  • At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
                  • One uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}>
                  • One lowercase letter
                </li>
                <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-500"}>
                  • One number
                </li>
                <li className={/[\W_]/.test(password) ? "text-green-600" : "text-red-500"}>
                  • One special character
                </li>
              </ul>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-2">
                <Spinner size="lg" />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <Link to="/login" className="text-blue-600 font-medium underline">
                Login
              </Link>
            </div>
          </>
        )}
      </motion.form>
    </div>
  );
}
