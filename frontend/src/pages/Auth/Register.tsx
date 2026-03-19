import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../../components/Spinner";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

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
        <div className="glass-card p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="flex justify-center">
                  <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Registration Successful!</h2>
                  <p className="text-muted-foreground">
                    Please check your inbox to verify your email.
                  </p>
                </div>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition shadow-lg font-semibold active:scale-95"
                >
                  Verify Email
                </a>
                <div className="text-sm text-muted-foreground pt-4">
                  Already verified?{" "}
                  <Link to="/login" className="text-primary font-bold hover:underline transition-all">Log in here</Link>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h2>
                  <p className="text-sm text-muted-foreground">Start your financial journey with Trackifi</p>
                </div>

                <div className="space-y-4">
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

                  {password.length > 0 && (
                    <motion.ul 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[10px] sm:text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg border border-border/50"
                    >
                      {[
                        { label: "At least 8 characters", regex: /.{8,}/ },
                        { label: "One uppercase letter", regex: /[A-Z]/ },
                        { label: "One lowercase letter", regex: /[a-z]/ },
                        { label: "One number", regex: /[0-9]/ },
                        { label: "One special character", regex: /[\W_]/ },
                      ].map((rule, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-center gap-1.5 ${rule.regex.test(password) ? "text-green-600 font-medium" : "text-muted-foreground"}`}
                        >
                          <span className={`w-1 h-1 rounded-full ${rule.regex.test(password) ? "bg-green-600" : "bg-muted-foreground"}`} />
                          {rule.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
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

                {loading ? (
                  <div className="flex justify-center items-center py-2">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-md active:scale-[0.98]"
                  >
                    Create Account
                  </button>
                )}

                <div className="text-center text-sm text-muted-foreground pt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-bold hover:underline transition-all">
                    Login
                  </Link>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
