"use client";

import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import QRTicketCard from "@/components/QRTicketCard";

// Mock QR tickets data
const MOCK_TICKETS = [
  {
    id: "TKT001",
    eventName: "Underground House Night",
    date: "Feb 15, 2026",
    time: "10:00 PM",
    venue: "Downtown Club",
    qrCode:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='black' width='10' height='10'/%3E%3C/svg%3E",
    ticketCode: "SNKOUT-HOUSE-2026-001",
    status: "Valid" as const,
  },
  {
    id: "TKT002",
    eventName: "Tech Conference After Party",
    date: "Feb 22, 2026",
    time: "9:00 PM",
    venue: "Marina Bay",
    qrCode:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='black' width='10' height='10'/%3E%3C/svg%3E",
    ticketCode: "SNKOUT-TECH-2026-002",
    status: "Valid" as const,
  },
  {
    id: "TKT003",
    eventName: "Indie Showcase",
    date: "Feb 8, 2026",
    time: "8:00 PM",
    venue: "Riverside Theatre",
    qrCode:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='black' width='10' height='10'/%3E%3C/svg%3E",
    ticketCode: "SNKOUT-INDIE-2026-003",
    status: "Used" as const,
  },
];

const MOCK_PAST_EVENTS = [
  {
    id: "EVT001",
    name: "Summer Music Festival",
    date: "Aug 20, 2025",
    venue: "Central Park",
  },
  {
    id: "EVT002",
    name: "Art Gallery Opening",
    date: "Jul 10, 2025",
    venue: "Downtown Gallery",
  },
];

export default function AttendeeProfilePage() {
  const handleSignOut = () => {
    alert("Signed out (Demo)");
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
        <p className="text-sm text-gray-600 mt-1">
          Tap any ticket to view full details
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Active Tickets Section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Upcoming & Active
          </h2>
          <div className="space-y-3">
            {MOCK_TICKETS.filter((t) => t.status !== "Used").map((ticket) => (
              <QRTicketCard key={ticket.id} {...ticket} />
            ))}
          </div>
        </section>

        {/* Used Tickets Section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Used Tickets
          </h2>
          <div className="space-y-3">
            {MOCK_TICKETS.filter((t) => t.status === "Used").map((ticket) => (
              <QRTicketCard key={ticket.id} {...ticket} />
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Past Events
          </h2>
          <div className="space-y-3">
            {MOCK_PAST_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {event.name}
                </h3>
                <p className="text-xs text-gray-600">{event.date}</p>
                <p className="text-xs text-gray-500 mt-1">{event.venue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Account Section */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Account</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600">Name</p>
              <p className="text-sm font-medium text-gray-900">
                Demo Attendee
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">
                attendee@demo.com
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
          >
            Sign Out
          </button>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
