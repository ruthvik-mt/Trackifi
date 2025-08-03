import { useEffect, useState } from 'react';

// Define missing type for beforeinstallprompt event
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
      console.log('Install result:', result);
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if (!showInstall) return null;

return (
  <button
    onClick={handleInstall}
    className="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-colors
      bg-black text-white border border-gray-800 hover:bg-gray-900
      dark:bg-white dark:text-black dark:border-gray-300 dark:hover:bg-gray-100"
  >
    Install Trackifi
  </button>
  );
};

export default InstallPrompt;
