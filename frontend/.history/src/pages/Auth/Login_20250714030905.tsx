// src/pages/Auth/Login.tsx
import { useState } from "react";
import { login } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    login(token);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />
        <FormInput label="Password" type="password" value={password} onChange={setPassword} />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
