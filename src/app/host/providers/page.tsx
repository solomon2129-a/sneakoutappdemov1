"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const PROVIDER_CATEGORIES = [
  { id: "venues", label: "Venues" },
  { id: "artists", label: "Artists/DJs" },
  { id: "photo", label: "Photo/Video" },
  { id: "sound", label: "Sound/Lighting" },
  { id: "security", label: "Security" },
  { id: "misc", label: "Misc" },
];

const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "Downtown Warehouse",
    category: "venues",
    basePrice: 1500,
    rating: 4.8,
    portfolio: "Modern industrial venue",
    availability: true,
  },
  {
    id: 2,
    name: "DJ Pulse",
    category: "artists",
    basePrice: 800,
    rating: 4.9,
    portfolio: "House, Techno, Disco",
    availability: true,
  },
  {
    id: 3,
    name: "Sharp Focus Media",
    category: "photo",
    basePrice: 600,
    rating: 4.7,
    portfolio: "Professional photos & video",
    availability: true,
  },
  {
    id: 4,
    name: "SoundWave Systems",
    category: "sound",
    basePrice: 1000,
    rating: 4.6,
    portfolio: "Complete PA & lighting setup",
    availability: true,
  },
  {
    id: 5,
    name: "Guardian Security",
    category: "security",
    basePrice: 400,
    rating: 4.5,
    portfolio: "Professional security team",
    availability: false,
  },
];

export default function HostProviders() {
  const [selectedCategory, setSelectedCategory] = useState("venues");
  const [cart, setCart] = useState<any[]>([]);

  const filteredProviders = MOCK_PROVIDERS.filter(
    (p) => p.category === selectedCategory
  );

  const addToCart = (provider: any) => {
    setCart([...cart, provider]);
  };

  const removeFromCart = (providerId: number) => {
    setCart(cart.filter((p) => p.id !== providerId));
  };

  const totalCost = cart.reduce((sum, p) => sum + p.basePrice, 0);

  return (
    <main className="min-h-screen bg-white pb-20">
      <Sidebar />

      <div className="pt-6 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Provider Marketplace
        </h1>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {PROVIDER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Providers Grid */}
        <div className="space-y-3 mb-8">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-gray-100 rounded-lg p-4 border border-gray-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-gray-600">{provider.portfolio}</p>
                </div>
                {provider.availability ? (
                  <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                    Available
                  </span>
                ) : (
                  <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                    Unavailable
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    ${provider.basePrice}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: {provider.rating}
                  </p>
                </div>
                {cart.some((p) => p.id === provider.id) ? (
                  <button
                    onClick={() => removeFromCart(provider.id)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(provider)}
                    disabled={!provider.availability}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-20 left-4 right-4 bg-gray-900 text-white rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">
                  {cart.length} provider{cart.length !== 1 ? "s" : ""} selected
                </p>
                <p className="text-lg font-bold">Total: ${totalCost}</p>
              </div>
              <button className="px-4 py-2 bg-white text-gray-900 rounded font-semibold hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
