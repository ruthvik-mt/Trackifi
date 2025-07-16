// // src/pages/Auth/Login.tsx
// import { useState } from "react";
// import { login as loginApi } from "@/api/auth";  // ✅ alias to avoid name clash
// import { useAuth } from "@/hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import FormInput from "@/components/FormInput";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login: setToken } = useAuth(); // rename so we don't shadow the API fn
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // 👉 make sure loginApi hits `/api/auth/login` inside src/api/auth.ts
//       const { token } = await loginApi({ email, password });
//       setToken(token);          // store JWT in context/localStorage
//       navigate("/dashboard");   // redirect to dashboard
//     } catch (err: unknown) {
//       // Better error reporting
//       if (axios.isAxiosError(err) && err.response) {
//         alert(err.response.data?.message || "Invalid credentials");
//       } else {
//         alert("Login failed");
//       }
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-96"
//       >
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <FormInput
//           label="Email"
//           type="email"
//           value={email}
//           onChange={setEmail}
//         />

//         <FormInput
//           label="Password"
//           type="password"
//           value={password}
//           onChange={setPassword}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded mt-4"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Sign In
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
