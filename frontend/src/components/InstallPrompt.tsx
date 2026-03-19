import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/20 transition-all active:scale-95 border border-primary/20 shadow-sm"
    >
      <Download size={14} />
      Install App
    </button>
  );
};

export default InstallPrompt;
