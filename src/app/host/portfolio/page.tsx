"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string | null;
  startDate: string;
  endDate: string;
  location: string;
  ticketPrice: number;
  status: string;
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "A wonderful outdoor music festival with top artists",
    image: null,
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    location: "Central Park, NY",
    ticketPrice: 75,
    status: "PUBLISHED",
  },
  {
    id: "2",
    title: "Tech Conference",
    description: "Annual technology conference with keynote speakers",
    image: null,
    startDate: "2025-07-01",
    endDate: "2025-07-03",
    location: "San Francisco, CA",
    ticketPrice: 199,
    status: "PUBLISHED",
  },
  {
    id: "3",
    title: "Workshop on AI",
    description: "Interactive workshop on artificial intelligence",
    image: null,
    startDate: "2025-05-20",
    endDate: "2025-05-20",
    location: "Online",
    ticketPrice: 45,
    status: "DRAFT",
  },
];

export default function HostPortfolio() {
  const [events] = useState<Event[]>(MOCK_EVENTS);

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Your Events</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and view your created events</p>
      </div>

      <div className="p-4 space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't created any events yet</p>
            <button
              onClick={() => alert("Go to create event")}
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => alert(`Viewing event: ${event.title}`)}
            >
              {event.image && (
                <div className="w-full h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">
                    📍 {event.location}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      event.status === "PUBLISHED"
                        ? "bg-green-100 text-green-800"
                        : event.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(event.startDate).toLocaleDateString()}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{event.ticketPrice}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </main>
  );
}
