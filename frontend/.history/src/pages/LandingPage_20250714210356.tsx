import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 h-16 bg-card text-card-foreground shadow-sm border-b border-border flex items-center justify-between px-6">
        <div className="text-xl font-bold text-primary">💰 FinShape</div>

        <nav className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/login"
            className="text-sm font-medium hover:underline hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link to="/register">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Get Started
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        className="text-center px-4 pt-20 pb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-primary">
          Get your money into shape
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Control your expenses, visualize your spending, and stay ahead with smart budgeting tools.
        </p>
        <<Link to="/register">
  <button
    className={`
      px-6 py-3 rounded-md font-semibold text-base
      transition-colors inline-flex items-center gap-2
      text-gray-900 dark:text-gray-100
      hover:text-white dark:hover:text-black
      bg-primary
    `}
  >
    Start Tracking <ArrowRight size={20} />
  </button>
</Link>


      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6 border-t border-border bg-background">
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
              className="bg-card text-card-foreground border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-transform hover:-translate-y-1"
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

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground bg-background border-t border-border">
        © {new Date().getFullYear()} FinShape. Built for smarter finance.
      </footer>
    </div>
  );
}
