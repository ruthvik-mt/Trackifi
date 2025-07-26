import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    axiosInstance
      .get(`/api/auth/verify-email?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // 3-second delay
      })
      .catch(() => {
        setMessage("Verification failed. Token may be expired or invalid.");
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      {message}
    </div>
  );
}
