"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function SearchPage() {
  const { user, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Remove useEffect - demo mode has no auth requirement

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <Sidebar />
      
      <div className="pt-6 px-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* Search Results - Placeholder */}
        <div className="space-y-4">
          {searchQuery ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg p-4 border border-gray-300"
              >
                <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 py-8">
              Start searching for events
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
