"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const MOCK_REQUESTS = [
  {
    id: 1,
    eventName: "Underground House Night",
    date: "Feb 15, 2026",
    time: "10:00 PM",
    hostName: "Alex Chen",
    offeredPrice: 850,
    location: "Downtown",
    requirements: "DJ setup for 500 capacity venue",
    status: "pending",
  },
  {
    id: 2,
    eventName: "Tech Conference After Party",
    date: "Feb 22, 2026",
    time: "9:00 PM",
    hostName: "Sarah Johnson",
    offeredPrice: 1200,
    location: "Marina Bay",
    requirements: "Full PA system + lighting + DJ",
    status: "pending",
  },
  {
    id: 3,
    eventName: "Indie Artist Showcase",
    date: "Feb 28, 2026",
    time: "8:00 PM",
    hostName: "Marcus Lee",
    offeredPrice: 600,
    location: "Arts District",
    requirements: "Photography services (4 hours)",
    status: "pending",
  },
];

export default function ProviderRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Demo mode - no auth required

  const handleAccept = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleDecline = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <Sidebar />

      <div className="pt-6 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Booking Requests
        </h1>

        {requests.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 border border-gray-300 text-center">
            <p className="text-gray-600 mb-2">No pending requests</p>
            <p className="text-sm text-gray-500">
              Requests from hosts will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === request.id ? null : request.id
                    )
                  }
                  className="w-full text-left p-4 hover:bg-gray-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {request.eventName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {request.date} at {request.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        Host: {request.hostName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${request.offeredPrice}
                      </p>
                      <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded inline-block mt-2">
                        Pending
                      </span>
                    </div>
                  </div>
                </button>

                {expandedId === request.id && (
                  <div className="border-t border-gray-300 p-4 bg-white">
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-gray-900 font-medium">
                          {request.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Requirements</p>
                        <p className="text-gray-900 font-medium">
                          {request.requirements}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                    <button className="w-full mt-2 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Contact Host
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
