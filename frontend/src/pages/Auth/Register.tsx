// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../../axios";
// import FormInput from "../../components/FormInput";
// import ThemeToggleButton from "../../components/ThemeToggleButton";
// import { motion } from "framer-motion";

// export default function Register() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const isPasswordStrong = (pwd: string) => {
//     const conditions = [
//       /.{8,}/.test(pwd),       // Min 8 characters
//       /[A-Z]/.test(pwd),       // At least one uppercase
//       /[a-z]/.test(pwd),       // At least one lowercase
//       /[0-9]/.test(pwd),       // At least one digit
//       /[\W_]/.test(pwd),       // At least one special char
//     ];
//     return conditions.filter(Boolean).length >= 4;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!isPasswordStrong(password)) {
//       setError("Password must be 8+ characters and include upper, lower, number & symbol.");
//       return;
//     }

//     try {
//       await axios.post("/api/auth/register", { fullName, email, password });
//       navigate("/login");
//     } catch {
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-background px-4 text-foreground relative overflow-hidden">
//       {/* Theme toggle button */}
//       <div className="absolute top-5 right-5 z-10">
//         <ThemeToggleButton />
//       </div>

//       {/* Animated glow background */}
//       <div className="absolute -z-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="w-full max-w-md backdrop-blur-md bg-card/80 border border-border p-8 rounded-xl shadow-xl space-y-5"
//       >
//         <h2 className="text-3xl font-bold text-center">Create an Account</h2>

//         <FormInput
//           label="Full Name"
//           type="text"
//           placeholder="Full name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />

//         <FormInput
//           label="Email Address"
//           type="email"
//           placeholder="E-mail address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <FormInput
//           label="Password"
//           type="password"
//           placeholder=" Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {!isPasswordStrong(password) && password.length > 0 && (
//           <p className="text-sm text-red-500">
//             Password must include 4 of: uppercase, lowercase, number, symbol, and be 8+ characters.
//           </p>
//         )}

//         {error && <p className="text-sm text-red-500 text-center">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Register
//         </button>

//         <div className="text-center text-sm text-muted-foreground">
//           Already registered?{" "}
//           <Link to="/login" className="text-blue-600 font-medium underline">
//             Login
//           </Link>
//         </div>
//       </motion.form>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios"; // custom axios instance
import axios from "axios"; // original axios for type-checking
import FormInput from "../../components/FormInput";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { motion } from "framer-motion";

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;
        setError(serverMessage || "Registration failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
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

            {!isPasswordStrong(password) && password.length > 0 && (
              <p className="text-sm text-red-500">
                Password must include 4 of: uppercase, lowercase, number, symbol, and be 8+ characters.
              </p>
            )}

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

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
