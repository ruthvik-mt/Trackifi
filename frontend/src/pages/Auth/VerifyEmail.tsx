import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    axiosInstance
      .get(`/api/auth/verify?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully! You can now log in.");
      })
      .catch(() => {
        setMessage("Verification failed. Token may be expired or invalid.");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      {message}
    </div>
  );
}
