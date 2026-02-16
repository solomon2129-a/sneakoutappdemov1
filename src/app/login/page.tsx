"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      // Store user data in localStorage for session persistence
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sneakout</h2>
      </div>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-gray-100 border border-gray-300 text-gray-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <p className="text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-gray-900 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
