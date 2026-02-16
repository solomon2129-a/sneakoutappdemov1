"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { EventCard } from "@/components/EventCard";
import { SkeletonLoaderGrid } from "@/components/SkeletonLoader";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  startDate: Date;
  location: string;
  city: string;
  ticketPrice: number;
  status: string;
}

function EventsContent() {
  const [events] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch events from API
    setLoading(false);
  }, []);

  if (loading) {
    return <SkeletonLoaderGrid />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {events.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400 text-lg">No events yet</p>
          <Link
            href="/create-event"
            className="text-white hover:text-gray-300 mt-4 inline-block"
          >
            Create the first event →
          </Link>
        </div>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event as any} />
        ))
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar title="Events" />
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Discover Events</h1>
          <Link
            href="/create-event"
            className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            + New
          </Link>
        </div>
        <Suspense fallback={<SkeletonLoaderGrid />}>
          <EventsContent />
        </Suspense>
      </div>
      <BottomNav />
    </div>
  );
}
