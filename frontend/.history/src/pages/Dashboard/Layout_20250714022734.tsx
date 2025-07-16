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
