import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronRight, LayoutDashboard, ListTree, Wallet, History, BarChart3, Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteAccount } from "../api/user";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);
      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, setIsSidebarOpen]);

  useEffect(() => {

  }, [isSidebarOpen, isMobile]);

  useEffect(() => {
    if (location.pathname.startsWith("/insights/")) {
      setInsightsOpen(true);
    }
    // Close mobile sidebar on navigation
    if (isMobile) {
    }
  }, [location.pathname, isMobile, setIsSidebarOpen]);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
      // Redirect to landing page and clear local storage/cookies
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const navItems = [
    { to: "/dashboard", label: "Home", icon: LayoutDashboard },
    { to: "/categories", label: "Categories", icon: ListTree },
    { to: "/budgets", label: "Budgets", icon: Wallet },
    { to: "/transactions", label: "Transactions", icon: History },
  ];

  const insightItems = [
    { to: "/insights/monthly-total", label: "Monthly Total" },
    { to: "/insights/category-breakdown", label: "Category Breakdown" },
    { to: "/insights/budget-comparison", label: "Budget vs Actual" },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isMobile ? -280 : 0 },
  };

  return (
    <>
      {/* Backdrop - Mobile Only */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen || !isMobile ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative top-0 left-0 w-64 h-full md:h-screen z-40 bg-card text-card-foreground border-r shadow-2xl md:shadow-none`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <img src="/logo-light.png" alt="Logo" className="absolute h-8 w-8 object-contain dark:hidden" />
              <img src="/logo-dark.png" alt="Logo" className="absolute h-8 w-8 object-contain hidden dark:block" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Trackifi
            </span>
          </div>
          {isMobile && (
            <button 
              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 shadow-sm" 
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-hide">
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Main Menu</p>
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                  location.pathname === to 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold" 
                    : "hover:bg-muted font-medium text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={18} className={location.pathname === to ? "text-primary-foreground" : "group-hover:text-primary transition-colors"} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">Analytics</p>
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
                location.pathname.startsWith("/insights")
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 size={18} className={location.pathname.startsWith("/insights") ? "text-primary-foreground" : ""} />
                <span>Insights</span>
              </div>
              {insightsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            <AnimatePresence>
              {insightsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 space-y-1 overflow-hidden"
                >
                  {insightItems.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`block px-5 py-2 rounded-lg text-xs transition-all duration-200 relative ${
                        location.pathname === to 
                          ? "text-primary font-bold after:absolute after:left-2 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Footer / Delete Account */}
        <div className="px-6 py-6 border-t border-border/50">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group"
          >
            <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
            <span>Delete Account</span>
          </button>
        </div>
      </motion.aside>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isDeleting && setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-card text-card-foreground p-8 rounded-3xl shadow-2xl border border-destructive/20 max-w-md w-full overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-destructive/30" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Delete Account?</h3>
                  <p className="text-sm text-muted-foreground">This action is permanent.</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Are you sure you want to delete your account? All your <span className="font-bold text-foreground">transactions, budgets, and data</span> will be permanently erased. This cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-muted hover:bg-muted/80 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all shadow-lg shadow-destructive/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Forever"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
