// import { useState } from "react";
// import { register } from "@/api/auth";
// import { useNavigate } from "react-router-dom";
// import FormInput from "@/components/FormInput";
// import axios from "axios";

// const Register = () => {
//   const [fullName, setFullName] = useState(""); // ✅ Match backend field
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await register({ fullName, email, password }); // ✅ backend expects fullName
//       alert("Registration successful! Please log in.");
//       navigate("/login");
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         alert(err.response?.data?.message || "Registration failed");
//       } else {
//         alert("Unexpected error occurred");
//       }
//       console.error("Registration error:", err);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <FormInput label="Full Name" type="text" value={fullName} onChange={setFullName} />
//         <FormInput label="Email" type="email" value={email} onChange={setEmail} />
//         <FormInput label="Password" type="password" value={password} onChange={setPassword} />
//         <button
//           type="submit"
//           className="bg-green-600 text-white w-full py-2 rounded mt-4"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
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
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
