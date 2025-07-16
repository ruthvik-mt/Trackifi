import { useState } from "react";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState(""); // ✅ Match backend field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ fullName, email, password }); // ✅ backend expects fullName
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Registration failed");
      } else {
        alert("Unexpected error occurred");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Full Name" type="text" value={fullName} onChange={setFullName} />
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />
        <FormInput label="Password" type="password" value={password} onChange={setPassword} />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
