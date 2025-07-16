// // src/components/Dashboard/Layout.tsx
// import { Outlet } from "react-router-dom";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

// const Layout = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

// Layout.tsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 overflow-y-auto">
          <motion.div
            className="bg-card text-card-foreground rounded-lg p-4 shadow max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
