// // src/components/Dashboard/Layout.tsx
// import { useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import { motion } from "framer-motion";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-background text-foreground">
//       {/* Sidebar */}
//       <Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Page Content with animation */}
//         <main className="flex-1 p-4 overflow-y-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             {children}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/Dashboard/Layout.tsx
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Extract title from path
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
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={pageTitle} />
        <main className="flex-1 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
