import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme"; // ✅ Adjust path as needed

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 shadow-sm bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">💰 FinShape</div>
        <nav className="space-x-4 flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            Login
          </Link>
          <Link to="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
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
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-blue-800 dark:text-blue-300">
          Get your money into shape
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Control your expenses, visualize your spending, and stay ahead with smart budgeting tools.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-base transition inline-flex items-center gap-2">
            Start Tracking <ArrowRight size={20} />
          </button>
        </Link>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900 transition">
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
              className="bg-gradient-to-br from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
        © {new Date().getFullYear()} FinShape. Built for smarter finance.
      </footer>
    </div>
  );
}
