import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [buttonLoading, setButtonLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setButtonLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ────────────── Header ────────────── */}
      <header className="sticky top-0 z-10 h-16 bg-card text-card-foreground shadow-sm flex items-center justify-between px-6">
        <a href="#hero" className="text-xl font-bold text-primary">Trackifi</a>

        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
          <a href="#cta" className="text-sm font-medium over:text-primary transition-colors">Contact</a>

          <button
            onClick={toggleTheme}
            className="px-2 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/login"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Login
          </Link>

          {buttonLoading ? (
            <Spinner size="default" />
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
        id="hero"
        className="text-center px-6 py-24 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-primary">
  Track. Plan. Thrive. Welcome to Smarter Finance
</h1>

<h2 className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6 xt-primary">
  Trackifi
</h2>

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
      <motion.section
        id="features"
        className="py-24 px-6 gap-12 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center">
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
          ].map(({ icon, title, desc }, index) => (
            <motion.div
              key={title}
              className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white border border-border p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.06 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
            >
              <div className="text-5xl mb-5">{icon}</div>
              <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ────────────── Testimonials Section ────────────── */}
    <motion.section
  id="testimonials"
  className="py-24 px-6 bg-background text-center"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
>
  <div className="h-12 bg-gradient-to-b from-transparent to-background" />
  <h2 className="text-3xl font-bold mb-12 text-primary">What users are saying</h2>
  <div className="max-w-4xl mx-auto space-y-8">
    {[
      "Trackifi helped me take control of my spending habits. It’s like having a financial coach in my pocket!",
      "I love the insights and budget reminders. Highly recommend for anyone serious about saving.",
    ].map((text, index) => (
      <motion.blockquote
        key={index}
        className="italic text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {`“${text}”`}
      </motion.blockquote>
    ))}
  </div>
</motion.section>



      {/* ────────────── FAQ Section ────────────── */}
     <motion.section
  id="faq"
  className="py-24 px-6 bg-background"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
>
  <div className="h-12 bg-gradient-to-b from-transparent to-background" />
  <h2 className="text-3xl font-bold mb-12 text-center text-primary">Frequently Asked Questions</h2>
  <div className="max-w-4xl mx-auto space-y-6">
    {[
      {
        question: "Is Trackifi free to use?",
        answer: "Yes, Trackifi is completely free to get started.",
      },
      {
        question: "Can I set spending limits or budgets?",
        answer: "Yes! You can create custom budgets for different categories and get alerts when you're nearing your limit.",
      },
    ].map(({ question, answer }, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h4 className="font-semibold">{question}</h4>
        <p className="text-sm text-muted-foreground">{answer}</p>
      </motion.div>
    ))}
  </div>
</motion.section>



      {/* ────────────── Call to Action ────────────── */}
      <motion.section
  id="cta"
  className="py-24 px-6 bg-background text-center"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
>
  <div className="h-12 bg-gradient-to-b from-transparent to-background" />
  <motion.div
    className="max-w-2xl mx-auto"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold mb-6 text-primary">Ready to shape your finances?</h2>
    <p className="mb-8 text-lg text-muted-foreground">
      Join Trackifi today and start your journey toward smarter money habits.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/contact">
        <button className="px-6 py-3 text-sm font-semibold bg-muted text-foreground border border-border rounded-md hover:bg-muted/80 transition-colors">
          Contact Us
        </button>
      </Link>
    </div>
  </motion.div>
</motion.section>



      {/* ────────────── Footer ────────────── */}
      <footer className="text-center py-6 text-sm text-muted-foreground bg-background">
        © {new Date().getFullYear()} Trackifi. Built for smarter finance.
      </footer>
    </div>
  );
}
