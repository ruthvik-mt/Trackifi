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

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
