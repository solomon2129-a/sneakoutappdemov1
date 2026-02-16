"use client";

import Link from "next/link";

interface NavbarProps {
  title?: string;
  showBack?: boolean;
}

export function Navbar({ title = "Sneakout", showBack = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4">
        {showBack ? (
          <Link href="/" className="text-white text-xl font-bold">
            ← Back
          </Link>
        ) : (
          <Link href="/" className="text-white text-xl font-bold">
            {title}
          </Link>
        )}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-gray-400 hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
