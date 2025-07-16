// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">💰 FinanceTrackr</h1>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Get Started</Link>
        </nav>
      </header>

      {/* Hero */}
      <motion.section
        className="text-center max-w-3xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Take Control of Your Money
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Visualize your expenses, set budgets, and achieve your financial goals effortlessly.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {[
            {
              icon: "🧾",
              title: "Have perfect control",
              desc: "Track all your cash, bank, and wallet expenses in one place.",
            },
            {
              icon: "📊",
              title: "Get a quick overview",
              desc: "See total incomes & expenses at a glance with interactive charts.",
            },
            {
              icon: "🎯",
              title: "Use smart budgets",
              desc: "Set spending goals and get alerts when nearing your limits.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} FinanceTrackr. All rights reserved.
      </footer>
    </div>
  );
}
