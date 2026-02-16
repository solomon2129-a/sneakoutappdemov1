"use client";

import { Navbar } from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function TicketsPage() {
  // TODO: Fetch user's tickets from API

  const tickets: any[] = [];

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar title="My Tickets" />
      <div className="px-4 py-6">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-6">No tickets yet</p>
            <Link
              href="/events"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <h3 className="text-white font-bold">{ticket.eventTitle}</h3>
                <p className="text-gray-400 text-sm">{ticket.date}</p>
                <p className="text-white font-semibold mt-2">
                  QR Code: {ticket.qrCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
