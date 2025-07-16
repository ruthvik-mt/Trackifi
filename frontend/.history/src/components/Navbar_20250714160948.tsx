import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const toggleSidebar = () => {
    console.log("Sidebar toggle logic here");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar toggleSidebar={toggleSidebar} />
      <main className="p-4">{children}</main>
    </div>
  );
}
