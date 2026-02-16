"use client";

import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const ACTIVE_EVENTS = [
  {
    id: "E001",
    name: "Summer Music Festival",
    date: "Feb 15, 2026",
    ticketsSold: 1250,
    status: "Live",
    earnings: 3750,
  },
  {
    id: "E002",
    name: "Tech Conference Gala",
    date: "Feb 22, 2026",
    ticketsSold: 0,
    status: "Pending",
    earnings: 0,
  },
];

const PAYOUTS = [
  { id: "P001", date: "Jan 31, 2026", amount: 2450, status: "Paid" },
  { id: "P002", date: "Feb 28, 2026", amount: 1875, status: "Scheduled" },
];

const HISTORY = [
  { id: "H001", name: "New Year Bash 2026", date: "Jan 5, 2026", earned: 1200 },
  {
    id: "H002",
    name: "Vintage Wine Tasting",
    date: "Dec 20, 2025",
    earned: 950,
  },
];

export default function ProviderPerformance() {
  // Demo mode - no auth required

  const totalEarnings = PAYOUTS.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
        <p className="text-sm text-gray-600 mt-1">Earnings & booking history</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Total Earnings */}
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <p className="text-sm opacity-90 mb-2">Total Earnings</p>
          <h2 className="text-4xl font-bold">${totalEarnings.toLocaleString()}</h2>
          <p className="text-xs opacity-75 mt-2">All time</p>
        </div>

        {/* Active Events */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Active Events
          </h2>
          <div className="space-y-3">
            {ACTIVE_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {event.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      event.status === "Live"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{event.date}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-600">Tickets Sold</p>
                    <p className="font-semibold text-gray-900">
                      {event.ticketsSold}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Your Earnings</p>
                    <p className="font-semibold text-gray-900">
                      ${event.earnings}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payouts */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Payouts</h2>

          {/* Upcoming */}
          <div className="mb-4">
            <p className="text-xs text-gray-600 font-medium mb-2">Upcoming</p>
            <div className="space-y-2">
              {PAYOUTS.filter((p) => p.status === "Scheduled").map((payout) => (
                <div
                  key={payout.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {payout.date}
                    </p>
                    <p className="text-xs text-gray-600">{payout.status}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${payout.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <p className="text-xs text-gray-600 font-medium mb-2">Past Payouts</p>
          <div className="space-y-2">
            {PAYOUTS.filter((p) => p.status === "Paid").map((payout) => (
              <div
                key={payout.id}
                className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    {payout.date}
                  </p>
                  <p className="text-xs text-gray-600">{payout.status}</p>
                </div>
                <p className="font-semibold text-gray-900">${payout.amount}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking History */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Booking History
          </h2>
          <div className="space-y-3">
            {HISTORY.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {booking.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{booking.date}</p>
                <p className="text-sm font-semibold text-gray-900">
                  Earned: ${booking.earned}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
