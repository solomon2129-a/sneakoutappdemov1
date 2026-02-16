"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type FormStep = "details" | "password" | "coupon" | "success";

export default function BecomeHostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = useState<FormStep>("details");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  // Details form
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !description) {
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
      const response = await fetch("/api/auth/become-host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currentPassword: password,
          companyName,
          description,
          website,
          coupon,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to become a host");
      }

      setStep("success");
      setTimeout(() => router.push("/host"), 2000);
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
            You are now approved to host events.
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
          Become a Host
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
                Company Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your hosting experience"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
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
              {isLoading ? "Verifying..." : "Activate Host Account"}
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
