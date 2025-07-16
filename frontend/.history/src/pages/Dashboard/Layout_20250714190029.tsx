// src/components/Dashboard/Layout.tsx
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ Optional: Dynamic title from path
  const getTitleFromPath = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "Dashboard";
    return last
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar with toggle + theme + logout */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 pb-24 overflow-y-auto" role="main">
          {/* Optional Dynamic Page Title */}
          <h1 className="text-2xl font-bold mb-6 text-foreground">
            {getTitleFromPath(location.pathname)}
          </h1>

          {/* Animated content container */}
          <motion.div
            className="bg-card text-card-foreground rounded-xl shadow p-6 max-w-5xl w-full mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
