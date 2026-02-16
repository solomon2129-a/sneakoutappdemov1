"use client";

import { Navbar } from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

type FormStep = "details" | "providers";

interface Provider {
  id: string;
  user: {
    id: string;
    name: string | null;
    phone: string | null;
    avatar: string | null;
  };
  category: string;
  experience: number;
  basePrice: number;
  rating: number;
  totalBookings: number;
  description: string | null;
}

const MOCK_PROVIDERS: Provider[] = [
  {
    id: "p1",
    user: { id: "u1", name: "John Smith", phone: "+1234567890", avatar: null },
    category: "Catering",
    experience: 5,
    basePrice: 500,
    rating: 4.8,
    totalBookings: 120,
    description: "Professional catering for all events",
  },
  {
    id: "p2",
    user: { id: "u2", name: "Jane Doe", phone: "+1234567891", avatar: null },
    category: "Photography",
    experience: 8,
    basePrice: 800,
    rating: 4.9,
    totalBookings: 200,
    description: "High-quality event photography",
  },
];

export default function CreateEventPage() {
  const [step, setStep] = useState<FormStep>("details");
  const [loading, setLoading] = useState(false);
  const [providers] = useState<Provider[]>(MOCK_PROVIDERS);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    startDate: "",
    endDate: "",
    capacity: 0,
    ticketPrice: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Price") || name.includes("capacity") ? parseFloat(value) : value,
    }));
  };

  const handleNextStep = async () => {
    setStep("providers");
  };

  const handleProviderToggle = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Event created with data:", { ...formData, selectedProviders });
      alert("Event created successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error creating event:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar title="Create Event" showBack />
      <div className="px-4 py-6 max-w-2xl">
        {step === "details" && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Underground Hip-Hop Night"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your event..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Ticket Price (₹)
                </label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 mt-6"
            >
              Next: Select Providers
            </button>
          </form>
        )}

        {step === "providers" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Select Providers</h2>
              <p className="text-gray-400 text-sm">
                Choose the providers you want to book for your event
              </p>
            </div>

            {providers.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No providers available
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {providers.map((provider) => (
                  <button
                    key={provider.user.id}
                    type="button"
                    onClick={() => handleProviderToggle(provider.user.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      selectedProviders.includes(provider.user.id)
                        ? "border-white bg-gray-800"
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">
                          {provider.user.name || "Provider"}
                        </h3>
                        <p className="text-gray-400 text-sm">{provider.category}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {provider.experience} years experience • {provider.totalBookings} bookings
                        </p>
                        {provider.description && (
                          <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                            {provider.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-yellow-400 text-sm">★ {provider.rating}</span>
                        <span className="text-white font-bold text-lg">₹{provider.basePrice}</span>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-2 ${
                            selectedProviders.includes(provider.user.id)
                              ? "border-white bg-white"
                              : "border-gray-600"
                          }`}
                        >
                          {selectedProviders.includes(provider.user.id) && (
                            <span className="text-gray-900 text-sm">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex-1 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || selectedProviders.length === 0}
                className="flex-1 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
