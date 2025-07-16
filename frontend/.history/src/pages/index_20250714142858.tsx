"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-foreground">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">💰 Finance Tracker</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="text-center max-w-3xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Take Control of Your Finances
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Track expenses, set budgets, and gain insights — all in one powerful dashboard.
        </p>
        <Link href="/register">
          <Button size="lg" className="gap-2">
            Start Now <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </motion.section>

      {/* Features */}
      <section className="bg-card text-card-foreground py-16 px-6">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3 text-center">
          {[
            {
              icon: "📊",
              title: "Visualize Spending",
              desc: "See where your money goes with dynamic charts and breakdowns.",
            },
            {
              icon: "🧮",
              title: "Set Budgets",
              desc: "Define monthly limits and monitor overspending in real-time.",
            },
            {
              icon: "🔔",
              title: "Stay Notified",
              desc: "Get alerts when you're close to limits or reach your goals.",
            },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 border"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Finance Tracker. All rights reserved.
      </footer>
    </div>
  );
}
