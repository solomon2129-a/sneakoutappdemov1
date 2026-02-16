"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { sector } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Attendee Navigation
  if (sector === "attendee") {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 h-16">
        <div className="flex justify-around items-center h-full">
          <Link
            href="/home"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/home")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            href="/search"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/search")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
            </svg>
            <span className="text-xs font-medium">Search</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/profile")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    );
  }

  // Host Navigation
  if (sector === "host") {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 h-16">
        <div className="flex justify-around items-center h-full">
          <Link
            href="/host/dashboard"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/host/dashboard")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
            </svg>
            <span className="text-xs font-medium">Dashboard</span>
          </Link>

          <Link
            href="/host/portfolio"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/host/portfolio")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.63l2.96-3.83c.37-.48.91-.76 1.5-.76.97 0 1.75.78 1.75 1.75S17.97 12 17 12c-.59 0-1.13-.28-1.5-.76z" />
            </svg>
            <span className="text-xs font-medium">Portfolio</span>
          </Link>

          <Link
            href="/host/profile"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/profile")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    );
  }

  // Provider Navigation
  if (sector === "provider") {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 h-16">
        <div className="flex justify-around items-center h-full">
          <Link
            href="/provider/calendar"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/provider/calendar")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            <span className="text-xs font-medium">Calendar</span>
          </Link>

          <Link
            href="/provider/performance"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/provider/performance")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
            </svg>
            <span className="text-xs font-medium">Performance</span>
          </Link>

          <Link
            href="/provider/profile"
            className={`flex flex-col items-center justify-center w-1/3 h-full transition-colors ${
              isActive("/profile")
                ? "text-gray-900 border-t-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    );
  }

  // Default fallback
  return null;
}
