// src/components/FullPageLoader.tsx

import { Loader } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-primary transition-colors">
      <Loader className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
