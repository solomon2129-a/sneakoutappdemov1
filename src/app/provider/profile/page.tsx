"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function ProviderProfile() {
  const { user, userProfile, sector, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Settings & availability</p>
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
                {userProfile?.name || "Provider"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {userProfile?.email}
              </p>
            </div>
          </div>
        </section>

        {/* Service Category */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Service Category
          </h2>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500">
            <option>Select your category</option>
            <option>Venues</option>
            <option>Artists/DJs</option>
            <option>Photo/Video</option>
            <option>Sound/Lighting</option>
            <option>Security</option>
            <option>Other</option>
          </select>
        </section>

        {/* Default Price */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Default Price
          </h2>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-600">$</span>
            <input
              type="number"
              placeholder="500"
              className="w-full border border-gray-300 rounded-lg px-7 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Base price hosts will see in marketplace
          </p>
        </section>

        {/* Portfolio */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Portfolio
          </h2>
          <div className="space-y-3">
            <textarea
              placeholder="Describe your services and experience"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <button className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              Upload Images
            </button>
          </div>
        </section>

        {/* Availability */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Availability
          </h2>
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <label key={day} className="flex items-center gap-3 p-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              )
            )}
            <label className="flex items-center gap-3 p-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Weekends</span>
            </label>
          </div>
        </section>

        {/* Payout Info */}
        <section>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Payout Info
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
