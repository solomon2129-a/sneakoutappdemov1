"use client";

import { useState } from "react";

interface QRTicketCardProps {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  qrCode: string; // URL or data URL
  ticketCode: string;
  status: "Valid" | "Used" | "Expired";
}

export default function QRTicketCard({
  eventName,
  date,
  time,
  venue,
  qrCode,
  ticketCode,
  status,
}: QRTicketCardProps) {
  const [showQR, setShowQR] = useState(false);

  const statusColor = {
    Valid: "bg-green-50 text-green-700 border-green-200",
    Used: "bg-gray-100 text-gray-700 border-gray-300",
    Expired: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <>
      <div
        onClick={() => setShowQR(true)}
        className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {eventName}
            </h3>
            <p className="text-xs text-gray-600 mb-2">{date} • {time}</p>
            <p className="text-xs text-gray-500 mb-3">{venue}</p>
          </div>
          <div
            className={`text-xs font-medium px-2 py-1 rounded border ${
              statusColor[status]
            }`}
          >
            {status}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-gray-600">{ticketCode}</div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 11h8V3H3v8zm0 8h8v-8H3v8zm10 0h8v-8h-8v8zm0-18v8h8V1h-8z" />
          </svg>
        </div>
      </div>

      {/* Full-screen QR Modal */}
      {showQR && (
        <div
          onClick={() => setShowQR(false)}
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">{eventName}</h2>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-center">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-600 mb-2">Ticket Code</p>
              <p className="font-mono text-sm font-semibold text-gray-900 mb-4">
                {ticketCode}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">{date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium text-gray-900">{time}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-4">{venue}</p>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
