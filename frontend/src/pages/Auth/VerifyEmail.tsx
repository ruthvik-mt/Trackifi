import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. Please check your email again.");
      return;
    }

    axiosInstance
      .get(`/api/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");
        setMessage("Email verified successfully! You can now log in to your account.");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data || "Verification failed. The token may be expired or invalid.");
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-10 rounded-[2.5rem] border-none bg-card/40 text-center relative z-10 space-y-8"
      >
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center"
              >
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center shadow-inner ring-1 ring-emerald-500/20"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center shadow-inner ring-1 ring-destructive/20"
              >
                <XCircle className="w-10 h-10 text-destructive" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            {status === "loading" ? "Verification" : status === "success" ? "Success!" : "Failed"}
          </h1>
          <p className="text-muted-foreground font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {status === "success" && (
          <div className="text-sm font-bold text-primary animate-pulse">
            Redirecting to login...
          </div>
        )}

        {(status === "error" || status === "loading") && (
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted text-foreground font-bold rounded-2xl transition-all border border-border/50"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        )}
      </motion.div>
    </div>
  );
}
