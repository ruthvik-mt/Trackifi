import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner"; // ✅ your Spinner component

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [buttonLoading, setButtonLoading] = useState(true);

  // 👇 Show spinner for 1 second after page loads
  useEffect(() => {
    const timer = setTimeout(() => setButtonLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ────────────── Header ────────────── */}
      <header className="sticky top-0 z-10 h-16 bg-card text-card-foreground shadow-sm flex items-center justify-between px-6">
        <div className="text-xl font-bold text-primary">💰 FinShape</div>

        <nav className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-2 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          
            <Link
              to="/login"
              className="text-sm font-medium hover:underline hover:text-primary transition-colors"
            >
              Login
            </Link>
          
          {buttonLoading ? (
             <><div className="flex justify-center"></div><Spinner size="default" /></>
          ) : (
            <Link to="/register">
              <button className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </Link>
          )}
        </nav>
      </header>

      {/* ────────────── Hero Section ────────────── */}
      <motion.section
        className="text-center px-6 py-24 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-primary">
          Get your money into shape
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Control your expenses, visualize your spending, and stay ahead with smart budgeting tools.
        </p>

        {buttonLoading ? (
  <div className="flex justify-center">
    <Spinner size="lg" />
  </div>
) : (
  <Link to="/register">
    <button
      aria-label="Start tracking your expenses"
      className="px-6 py-3 rounded-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 transition-colors"
    >
      Start Tracking <ArrowRight size={20} />
    </button>
  </Link>
)}

      </motion.section>

      {/* ────────────── Features Section ────────────── */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center">
          {[
            {
              icon: "📊",
              title: "Perfect Control",
              desc: "Track cash, bank accounts, wallets & crypto all in one place.",
            },
            {
              icon: "📈",
              title: "Smart Insights",
              desc: "Visualize income and spending with real-time analytics.",
            },
            {
              icon: "💡",
              title: "Budget Goals",
              desc: "Set budgets, receive alerts, and stay on track financially.",
            },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className="bg-card text-card-foreground p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────── Footer ────────────── */}
      <footer className="text-center py-6 text-sm text-muted-foreground bg-background">
        © {new Date().getFullYear()} FinShape. Built for smarter finance.
      </footer>
    </div>
  );
}
