"use client";

import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

const MOCK_HOST_EVENTS = [
  {
    id: "EVT001",
    name: "Summer Music Festival",
    status: "Live" as const,
    ticketsSold: 342,
    revenue: 8550,
  },
  {
    id: "EVT002",
    name: "Tech Conference Dinner",
    status: "Pending" as const,
    ticketsSold: 0,
    revenue: 0,
  },
  {
    id: "EVT003",
    name: "Indie Artist Night",
    status: "Completed" as const,
    ticketsSold: 189,
    revenue: 3780,
  },
];

const statusColors = {
  Live: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Draft: "bg-gray-100 text-gray-700 border-gray-300",
  Completed: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function HostDashboard() {
  // Demo mode - no auth required

  const totalRevenue = MOCK_HOST_EVENTS.reduce(
    (sum, evt) => sum + evt.revenue,
    0
  );

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your events</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Create Event CTA */}
        <Link
          href="/host/create-event"
          className="block bg-gray-900 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-black transition-colors"
        >
          + Create Event
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Total Events</p>
            <p className="text-2xl font-bold text-gray-900">
              {MOCK_HOST_EVENTS.length}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Tickets Sold</p>
            <p className="text-2xl font-bold text-gray-900">
              {MOCK_HOST_EVENTS.reduce((sum, evt) => sum + evt.ticketsSold, 0)}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Live Events</p>
            <p className="text-2xl font-bold text-gray-900">
              {MOCK_HOST_EVENTS.filter((e) => e.status === "Live").length}
            </p>
          </div>
        </div>

        {/* Events List */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Your Events
          </h2>
          <div className="space-y-3">
            {MOCK_HOST_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {event.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded border ${
                      statusColors[event.status]
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-600">Tickets Sold</p>
                    <p className="font-semibold text-gray-900">
                      {event.ticketsSold}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">
                      ${event.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-3 text-xs font-medium text-gray-700 hover:text-gray-900 py-2 border-t border-gray-100">
                  Manage Event
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
