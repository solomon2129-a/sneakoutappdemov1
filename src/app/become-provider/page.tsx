"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type FormStep = "details" | "password" | "coupon" | "success";

const PROVIDER_CATEGORIES = [
  "Venue",
  "Artist/Musician",
  "Photographer",
  "Caterer",
  "DJ",
  "Decorator",
  "Event Planner",
  "Video/Production",
];

export default function BecomeProviderPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = useState<FormStep>("details");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  // Details form
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !experience || !basePrice || !description) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");
    setStep("coupon");
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/become-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currentPassword: password,
          category,
          experience,
          basePrice,
          description,
          coupon,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to become a provider");
      }

      setStep("success");
      setTimeout(() => router.push("/provider/profile"), 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setStep("coupon");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  if (step === "success") {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Success!
          </h1>
          <p className="text-gray-600 mb-6">
            You are now approved to provide services.
          </p>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Sneakout</h2>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Become a Provider
        </h1>
        <p className="text-gray-600 text-center mb-2 text-sm">
          Step {step === "details" ? "1" : step === "password" ? "2" : "3"} of 3
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gray-600"
                required
              >
                <option value="">Select a category</option>
                {PROVIDER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="number"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Enter years"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="Enter base price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your services and expertise"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="w-full mt-3 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Enter your account password to continue
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setStep("details")}
              className="w-full py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </form>
        )}

        {step === "coupon" && (
          <form onSubmit={handleCouponSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code *
              </label>
              <input
                type="password"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Verifying..." : "Activate Provider Account"}
            </button>
            <button
              type="button"
              onClick={() => setStep("password")}
              className="w-full py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </form>
        )}

        <button
          onClick={() => router.push("/home")}
          className="w-full mt-3 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
