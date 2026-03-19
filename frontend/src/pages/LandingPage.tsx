import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Moon, Sun, Shield, Zap, BarChart3, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/Spinner";
import InstallPrompt from "@/components/InstallPrompt";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [buttonLoading, setButtonLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setButtonLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ────────────── Header ────────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="h-20 grid grid-cols-2 md:grid-cols-3 items-center px-6 sm:px-12">
          <Link to="/" className="flex items-center gap-0.5 text-2xl font-black tracking-tight text-primary justify-self-start">
            <div className="relative h-8 w-8">
              <img src="/logo-light.png" alt="Logo" className="absolute h-8 w-8 object-contain dark:hidden" />
              <img src="/logo-dark.png" alt="Logo" className="absolute h-8 w-8 object-contain hidden dark:block" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Trackifi</span>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-bold tracking-tight text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center justify-end gap-4 justify-self-end">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-muted/50 text-foreground hover:scale-110 transition-transform"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/login" className="hidden md:block font-bold text-sm tracking-tight hover:text-primary transition-colors">
              Login
            </Link>

            <div className="hidden md:block">
              <InstallPrompt />
            </div>

            {buttonLoading ? (
              <div className="hidden md:flex justify-center items-center w-[120px]">
                <Spinner size="default" />
              </div>
            ) : (
              <Link to="/register" className="hidden md:block w-[120px]">
                <button className="w-full px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-tight shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                  Sign Up
                </button>
              </Link>
            )}

            {/* Hamburger button — visible only on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-muted/50 text-foreground hover:scale-110 transition-transform"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ────────────── Mobile Menu Drawer ────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
            >
              <nav className="flex flex-col gap-1 px-6 py-4">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-bold tracking-tight text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-bold tracking-tight text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                >
                  Testimonials
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-bold tracking-tight text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                >
                  FAQ
                </a>

                <div className="border-t border-border/50 my-2" />

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-bold tracking-tight text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                >
                  Login
                </Link>

                <div className="px-4 py-2">
                  <InstallPrompt />
                </div>

                {buttonLoading ? (
                  <div className="flex justify-center items-center py-3">
                    <Spinner size="default" />
                  </div>
                ) : (
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 flex">
                    <button className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-tight shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                      Sign Up
                    </button>
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ────────────── Hero Section ────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl aspect-square bg-primary/5 rounded-full blur-[120px]" />

        <motion.div style={{ y, opacity }} className="max-w-4xl space-y-8 -mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-4"
          >
            Next-Gen Personal Finance
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.1] text-foreground mb-6 text-center mx-auto"
          >
            Track. Plan. Thrive. <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Welcome to <br className="sm:hidden" />Smarter Finance
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Control your expenses, visualize your spending, and stay ahead with smart budgeting tools.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 min-h-[72px]"
          >
            {buttonLoading ? (
              <Spinner size="lg" />
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/register">
                  <button className="group px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center gap-3">
                    Start Tracking <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                {!buttonLoading && <InstallPrompt />}
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <a href="#features" className="text-muted-foreground/40 hover:text-primary transition-colors">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </section>

      {/* ────────────── Features Section ────────────── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Everything you need to thrive</h2>
            <p className="text-muted-foreground text-lg font-medium max-w-xl mx-auto">Trackifi combines simplicity with powerful insights to give you an edge.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BarChart3 className="w-10 h-10 text-emerald-500" />,
                title: "Perfect Control",
                desc: "Track your finances manually the simple way, with Trackifi.",
                bg: "bg-emerald-500/10"
              },
              {
                icon: <Zap className="w-10 h-10 text-blue-500" />,
                title: "Smart Insights",
                desc: "Visualize the spending with real-time analytics.",
                bg: "bg-blue-500/10"
              },
              {
                icon: <Shield className="w-10 h-10 text-violet-500" />,
                title: "Budget Goals",
                desc: "Set budgets, receive alerts, and stay on track financially.",
                bg: "bg-violet-500/10"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-10 rounded-[2.5rem] space-y-6 border-none bg-card/40 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-3xl ${feature.bg} flex items-center justify-center shadow-inner`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────── Testimonials ────────────── */}
      <section id="testimonials" className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tight"
          >
            Loved by smart savers
          </motion.h2>
          <div className="grid gap-12">
            {[
              "Trackifi helped me take control of my spending habits. It’s like having a financial coach in my pocket!",
              "I love the insights and budget reminders. Highly recommend for anyone serious about saving.",
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="space-y-4 flex flex-col items-center"
              >
                <p className="text-2xl sm:text-3xl font-black italic tracking-tight leading-snug">
                  "{text}"
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <span className="font-bold text-sm uppercase tracking-widest text-primary">Trackifi User</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── FAQ Section ────────────── */}
      <section id="faq" className="py-32 px-6 bg-background">
        <div className="max-w-3xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-8">
            {[
              {
                question: "Is Trackifi free to use?",
                answer: "Yes, Trackifi is completely free to get started and use for your daily tracking needs.",
              },
              {
                question: "Can I set spending limits or budgets?",
                answer: "Yes! You can create custom budgets for different categories and easily monitor when you're nearing your limit using our Insights.",
              },
            ].map(({ question, answer }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="glass-card p-8 rounded-3xl bg-card/40 border-none space-y-3"
              >
                <h4 className="font-black text-xl">{question}</h4>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">{answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Call to Action ────────────── */}
      <section id="cta" className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-5xl mx-auto glass-card p-12 sm:p-24 rounded-[3rem] text-center space-y-10 relative overflow-hidden flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="text-center relative z-10 w-full flex flex-col items-center justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight pb-2">Ready to shape <br className="hidden sm:block" /> your finances?</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium">
              Join Trackifi today and start your journey toward smarter money habits.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 mt-8">
              <Link to="/register">
                <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                  Join Trackifi Now
                </button>
              </Link>
              <a
                href="https://mail.google.com/mail/?view=cm&to=trackifi7@gmail.com"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-border font-black text-xl hover:bg-muted transition-all"
              >
                Contact Team
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ────────────── Footer ────────────── */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-0.5 text-xl font-black tracking-tight text-primary">
            <div className="relative h-6 w-6">
              <img src="/logo-light.png" alt="Logo" className="absolute h-6 w-6 object-contain dark:hidden" />
              <img src="/logo-dark.png" alt="Logo" className="absolute h-6 w-6 object-contain hidden dark:block" />
            </div>
            <span>Trackifi</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium tracking-tight">
            © {new Date().getFullYear()} Trackifi. Built for smarter finance.
          </div>
        </div>
      </footer>
    </div>
  );
}
