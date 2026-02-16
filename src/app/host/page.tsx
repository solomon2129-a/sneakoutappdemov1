"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

interface HostStats {
  totalEvents: number;
  totalRevenue: number;
  ticketsSold: number;
  averageRating: number;
}

export default function HostPage() {
  const [stats] = useState<HostStats>({
    totalEvents: 5,
    totalRevenue: 45230,
    ticketsSold: 1250,
    averageRating: 4.8,
  });

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar title="Host Dashboard" />
      <div className="px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-white text-3xl font-bold">{stats.totalEvents}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-white text-3xl font-bold">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Tickets Sold</p>
            <p className="text-white text-3xl font-bold">{stats.ticketsSold}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Average Rating</p>
            <p className="text-white text-3xl font-bold">{stats.averageRating}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link
            href="/create-event"
            className="block px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-750 transition-colors text-center"
          >
            + Create New Event
          </Link>
          <Link
            href="/host/portfolio"
            className="block px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-750 transition-colors text-center"
          >
            View Your Events
          </Link>
          <Link
            href="/host/analytics"
            className="block px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-750 transition-colors text-center"
          >
            View Analytics
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
