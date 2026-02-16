"use client";

import { useEffect, useState } from "react";

export function PWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setShowInstallButton(true);
    };

    // Check if app is already installed
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallButton(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setInstallPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton || isInstalled) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <button
        onClick={handleInstallClick}
        className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 active:scale-95"
      >
        Install Sneakout
      </button>
    </div>
  );
}
