"use client";

import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const MOCK_EVENTS = [
  {
    id: "EVT001",
    name: "Underground House Night",
    date: "Feb 15, 2026",
    time: "10:00 PM",
    venue: "Downtown Club",
    price: 25,
    attending: 342,
  },
  {
    id: "EVT002",
    name: "Tech Conference After Party",
    date: "Feb 22, 2026",
    time: "9:00 PM",
    venue: "Marina Bay",
    price: 35,
    attending: 189,
  },
  {
    id: "EVT003",
    name: "Indie Showcase",
    date: "Mar 5, 2026",
    time: "8:00 PM",
    venue: "Riverside Theatre",
    price: 20,
    attending: 76,
  },
];

export default function HomePage() {
  // Demo mode - no auth required

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
        <p className="text-sm text-gray-600 mt-1">Trending events near you</p>
      </div>

      <div className="p-4 space-y-4">
        {MOCK_EVENTS.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-gray-600 font-medium">
                  {event.date}
                </p>
                <p className="text-sm text-gray-700 font-semibold mt-1">
                  {event.time}
                </p>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-gray-900 text-sm mb-2">
                {event.name}
              </h2>
              <p className="text-xs text-gray-600 mb-3">{event.venue}</p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    ${event.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.attending} attending
                  </p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-black transition-colors">
                  Get Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
