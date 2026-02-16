"use client";

import { useState } from "react";

export default function RequestProviderPage() {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock submission
      console.log("Provider request submitted:", { reason });
      setSubmitted(true);
      setTimeout(() => {
        console.log("Redirecting to home");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Sneakout</h2>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Request Submitted
          </h1>
          <p className="text-gray-600 mb-6">
            Your provider access request has been submitted. We'll review it shortly.
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
          Request Provider Access
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tell us what services you offer
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What services do you provide?
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the services you offer (catering, photography, security, etc.)..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 min-h-[120px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        <button
          onClick={() => {
            console.log("Navigating to /home");
          }}
          className="w-full mt-3 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      </div>
    </main>
  );
}
