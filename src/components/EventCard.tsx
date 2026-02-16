import Link from "next/link";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const date = new Date(event.startDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        {event.image && (
          <div className="w-full h-40 bg-gray-700 relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-white text-lg line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-400 text-sm mt-2">{event.location}</p>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-gray-500 text-xs">Date & Time</p>
              <p className="text-white font-semibold">{formattedDate}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Price</p>
              <p className="text-white font-semibold">₹{event.ticketPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
