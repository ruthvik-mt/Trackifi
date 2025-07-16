import { useState } from "react";
import { login } from "@/api/auth"; // ✅ fixed
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setToken } = useAuth(); // rename to avoid conflict with API import
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await login({ email, password }); // ✅ call correct login
    setToken(token); // ✅ use AuthContext login
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
