import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">You're Offline</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Check your connection and try again
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
