"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to home (demo app - no login needed)
    router.push("/home");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>
  );
}
