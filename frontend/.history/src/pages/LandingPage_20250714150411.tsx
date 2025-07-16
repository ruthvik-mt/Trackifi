import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 shadow-sm bg-white sticky top-0 z-10">
        <div className="text-2xl font-bold text-blue-700">💰 FinShape</div>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-700 transition"
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
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-blue-800">
          Get your money into shape
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Control your expenses, visualize your spending, and stay ahead with smart budgeting tools.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-base transition inline-flex items-center gap-2">
            Start Tracking <ArrowRight size={20} />
          </button>
        </Link>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
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
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 bg-gray-50 border-t">
        © {new Date().getFullYear()} FinShape. Built for smarter finance.
      </footer>
    </div>
  );
}
