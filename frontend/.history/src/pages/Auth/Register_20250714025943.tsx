// src/pages/Auth/Register.tsx
import { useState } from "react";
import { registerUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({ name, email, password });
    navigate("/login");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Name" type="text" value={name} onChange={setName} />
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />
        <FormInput label="Password" type="password" value={password} onChange={setPassword} />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded mt-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
