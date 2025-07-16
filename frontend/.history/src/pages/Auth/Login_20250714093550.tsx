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
