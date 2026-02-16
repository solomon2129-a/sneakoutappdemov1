import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PWAInstall } from "@/components/PWAInstall";

export const metadata: Metadata = {
  title: "Sneakout - Underground Culture Events",
  description: "Making underground culture investable. Discover, book, and host authentic culture events.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sneakout",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sneakout" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon-192x192.svg" />
      </head>
      <body className="bg-white text-gray-900">
        <AuthProvider>
          <PWAInstall />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
