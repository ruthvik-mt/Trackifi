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

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

