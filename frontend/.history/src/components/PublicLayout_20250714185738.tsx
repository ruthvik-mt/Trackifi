// src/layouts/PublicLayout.tsx
import PublicNavbar from "../components/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main>{children}</main>
    </div>
  );
}
