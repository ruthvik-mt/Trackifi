import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow">
        <div className="text-xl font-bold text-blue-600">💰 FinShape</div>
        <nav className="space-x-6">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">Get Started</Link>
        </nav>
      </header>

      {/* Hero */}
      <motion.section
        className="text-center px-4 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get your money into shape</h1>
        <p className="text-lg text-gray-600 mb-6">
          Control your expenses, visualize your spending, and stay ahead with smart budgeting.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-blue-700">
            Start Tracking <ArrowRight size={20} />
          </button>
        </Link>
      </motion.section>

      {/* Features */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          {[
            {
              icon: "📊",
              title: "Perfect Control",
              desc: "Track cash, bank accounts, E-wallets & crypto in one place.",
            },
            {
              icon: "📈",
              title: "Smart Insights",
              desc: "Visualize income and spending at a glance.",
            },
            {
              icon: "💡",
              title: "Budget Goals",
              desc: "Stay within your limits with real-time alerts.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} FinShape. All rights reserved.
      </footer>
    </div>
  );
}
