// src/pages/Dashboard/Layout.tsx
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const path = location.pathname;

    if (path.startsWith("/insights/monthly-total")) return "Monthly Total";
    if (path.startsWith("/insights/category-breakdown")) return "Category Breakdown";
    if (path.startsWith("/insights/budget-comparison")) return "Budget vs Actual";
    if (path.startsWith("/insights")) return "Insights";
    if (path === "/dashboard") return "Home";
    if (path === "/categories") return "Categories";
    if (path === "/budgets") return "Budgets";
    if (path === "/transactions") return "Transactions";

    return "Dashboard";
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
