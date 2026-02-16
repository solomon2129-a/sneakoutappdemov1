"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

type Step = 1 | 2;

const PROVIDERS_CATEGORIES = [
  "Venues",
  "Artists/DJs",
  "Photo/Video",
  "Sound/Lighting",
  "Security",
];

const MOCK_PROVIDERS = [
  {
    id: "PV001",
    name: "Downtown Warehouse",
    category: "Venues",
    price: 1500,
    rating: 4.8,
  },
  {
    id: "PV002",
    name: "DJ Pulse",
    category: "Artists/DJs",
    price: 800,
    rating: 4.9,
  },
  {
    id: "PV003",
    name: "Sharp Focus Media",
    category: "Photo/Video",
    price: 600,
    rating: 4.7,
  },
  {
    id: "PV004",
    name: "SoundWave Systems",
    category: "Sound/Lighting",
    price: 1000,
    rating: 4.6,
  },
  {
    id: "PV005",
    name: "Guardian Security",
    category: "Security",
    price: 400,
    rating: 4.8,
  },
];

export default function CreateEventPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Venues");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    ticketPrice: "",
    capacity: "",
    location: "",
    description: "",
    coverImage: null as File | null,
  });

  // Demo mode - no auth required

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProviderToggle = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const filteredProviders = MOCK_PROVIDERS.filter(
    (p) => p.category === activeCategory
  );

  const selectedProviderObjects = MOCK_PROVIDERS.filter((p) =>
    selectedProviders.includes(p.id)
  );

  const providersTotal = selectedProviderObjects.reduce(
    (sum, p) => sum + p.price,
    0
  );

  const totalRevenue =
    (Number(formData.ticketPrice) || 0) * (Number(formData.capacity) || 0);

  const handleCreateEvent = () => {
    // Mock: Save to Firestore in real implementation
    console.log("Creating event:", { ...formData, selectedProviders });
    alert("Event created successfully! (Demo)");
  };

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
        <p className="text-sm text-gray-600 mt-1">Step {step} of 2</p>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 flex">
        <div
          className="bg-gray-900 transition-all"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      <div className="p-4">
        {/* STEP 1: Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Summer Music Festival"
                className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event details, theme, special activities..."
                rows={4}
                className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900">
                Location Area
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown District"
                className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Ticket Price ($)
                </label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="500"
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900">
                Cover Image
              </label>
              <div className="mt-2 border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg
                  className="w-8 h-8 mx-auto text-gray-400 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.63l2.96-3.83c.37-.48.91-.76 1.5-.76.97 0 1.75.78 1.75 1.75S17.97 12 17 12c-.59 0-1.13-.28-1.5-.76z" />
                </svg>
                <p className="text-sm text-gray-600">
                  Upload a cover image (optional)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
              >
                Next: Add Providers
              </button>
              <button
                onClick={() => alert("Event created successfully!")}
                className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Providers */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Select providers (optional) or add your own. <br /> Your estimated
              revenue: <span className="font-bold text-gray-900">
                ${totalRevenue}
              </span>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4">
              {PROVIDERS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Provider Cards */}
            <div className="space-y-3">
              {filteredProviders.map((provider) => (
                <label
                  key={provider.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedProviders.includes(provider.id)}
                    onChange={() => handleProviderToggle(provider.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {provider.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Rating: {provider.rating}/5
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${provider.price}
                  </p>
                </label>
              ))}
            </div>

            {/* Use Own Provider Option */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                + Use my own provider (manual entry)
              </button>
            </div>

            {/* Selected Providers Summary */}
            {selectedProviders.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">
                  Selected Providers (${providersTotal})
                </p>
                <div className="space-y-1">
                  {selectedProviderObjects.map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between text-xs text-gray-700"
                    >
                      <span>{p.name}</span>
                      <span>${p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleCreateEvent}
                className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
              >
                Publish Event
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
