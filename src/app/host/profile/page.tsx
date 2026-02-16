"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

interface HostProfile {
  companyName: string;
  description: string;
  website: string;
  totalEvents: number;
  totalRevenue: number;
  averageRating: number;
}

const MOCK_HOST_PROFILE: HostProfile = {
  companyName: "Your Company",
  description: "Event hosting company",
  website: "https://yourcompany.com",
  totalEvents: 5,
  totalRevenue: 45230,
  averageRating: 4.8,
};

export default function HostProfile() {
  const [hostProfile] = useState<HostProfile>(MOCK_HOST_PROFILE);

  const handleSignOut = () => {
    alert("Signed out (Demo)");
    console.log("Redirect to /login");
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Host settings & information</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Account Info */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Account Info
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600">Name</p>
              <p className="text-sm font-medium text-gray-900">
                Demo Host
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">
                host@demo.com
              </p>
            </div>
          </div>
        </section>

        {/* Host Info */}
        {hostProfile && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Host Information
            </h2>
            <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div>
                <p className="text-xs text-gray-600">Company Name</p>
                <p className="text-sm font-medium text-gray-900">
                  {hostProfile.companyName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Description</p>
                <p className="text-sm text-gray-700">
                  {hostProfile.description}
                </p>
              </div>
              {hostProfile.website && (
                <div>
                  <p className="text-xs text-gray-600">Website</p>
                  <p className="text-sm text-blue-600">{hostProfile.website}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Stats */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600">Total Events</p>
              <p className="text-lg font-bold text-gray-900">
                {hostProfile?.totalEvents || 0}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600">Average Rating</p>
              <p className="text-lg font-bold text-gray-900">
                {hostProfile?.averageRating || 0}★
              </p>
            </div>
          </div>
        </section>

        {/* Payout Details */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Payout Details
          </h2>
          <div className="space-y-3">
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500">
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Stripe</option>
            </select>
            <input
              type="text"
              placeholder="Account number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
          </div>
        </section>

        {/* Verification Status */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Verification
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs">
            <p className="font-medium text-yellow-900">Pending Review</p>
            <p className="text-yellow-800 mt-1">
              Your host account is under review. We'll notify you when approved.
            </p>
          </div>
        </section>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
        >
          Sign Out
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
