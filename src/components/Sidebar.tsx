"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { sector, setSector } = useAuth();

  const handleSectorChange = (newSector: "attendee" | "host" | "provider") => {
    setSector(newSector);
    setIsOpen(false);
  };

  return (
    <>
      {/* Logo Click Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 text-2xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
      >
        Sneakout
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-300 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo Modes</h2>

          <div className="space-y-3 mb-8">
            {/* Attendee */}
            <button
              onClick={() => handleSectorChange("attendee")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                sector === "attendee"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">Attendee</div>
              <div className="text-sm opacity-75">Discover & buy tickets</div>
            </button>

            {/* Host */}
            <button
              onClick={() => handleSectorChange("host")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                sector === "host"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">Host</div>
              <div className="text-sm opacity-75">Create & manage events</div>
            </button>

            {/* Provider */}
            <button
              onClick={() => handleSectorChange("provider")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                sector === "provider"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">Provider</div>
              <div className="text-sm opacity-75">Offer services & bookings</div>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">This is a demo/prototype. All features are accessible.</p>
          </div>
        </div>
      </div>
    </>
  );
}
