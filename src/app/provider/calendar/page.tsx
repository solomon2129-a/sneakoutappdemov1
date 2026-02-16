"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

interface BookingRequest {
  id: string;
  eventId: string;
  event: {
    id: string;
    title: string;
    startDate: string;
    location: string;
    host: {
      id: string;
      name: string;
    };
  };
  offeredPrice: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  eventDate: string;
}

export default function ProviderCalendar() {
  const { user, sector, loading } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateBookings, setDateBookings] = useState<Map<string, BookingRequest[]>>(
    new Map()
  );
  const [, setFetchLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.uid && !loading) {
      fetchBookings();
    }
  }, [user?.uid, loading]);

  const fetchBookings = async () => {
    try {
      setFetchLoading(true);
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      const response = await fetch(
        `/api/bookings/by-provider?providerId=${user?.uid}&month=${month}&year=${year}`
      );

      if (response.ok) {
        const data = await response.json();
        
        // Organize bookings by date
        const bookingsByDate = new Map<string, BookingRequest[]>();
        data.forEach((booking: BookingRequest) => {
          const dateKey = new Date(booking.eventDate).toDateString();
          if (!bookingsByDate.has(dateKey)) {
            bookingsByDate.set(dateKey, []);
          }
          bookingsByDate.get(dateKey)!.push(booking);
        });
        setDateBookings(bookingsByDate);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateBookingsList = dateBookings.get(date.toDateString()) || [];
    
    if (dateBookingsList.length === 0) {
      setSelectedDate(date);
      setShowModal(true);
    } else {
      setSelectedDate(date);
      setShowModal(true);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const response = await fetch("/api/bookings/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          status: "ACCEPTED",
        }),
      });

      if (response.ok) {
        fetchBookings();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const response = await fetch("/api/bookings/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          status: "REJECTED",
        }),
      });

      if (response.ok) {
        fetchBookings();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const getDateStatus = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateStr = date.toDateString();
    const dayBookings = dateBookings.get(dateStr) || [];

    if (dayBookings.length === 0) return "none";
    
    const hasPending = dayBookings.some((b) => b.status === "PENDING");
    const hasAccepted = dayBookings.some((b) => b.status === "ACCEPTED");

    if (hasAccepted) return "accepted";
    if (hasPending) return "pending";
    return "none";
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedDateBookings = selectedDate
    ? dateBookings.get(selectedDate.toDateString()) || []
    : [];

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      <Sidebar />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your bookings</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Month Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Prev
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{monthName}</h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const status = day ? getDateStatus(day) : "none";
              return (
                <button
                  key={idx}
                  onClick={() => day && handleDateClick(day)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                    day === null
                      ? "bg-transparent"
                      : status === "accepted"
                      ? "bg-green-100 text-green-900 border border-green-300 hover:bg-green-200"
                      : status === "pending"
                      ? "bg-yellow-100 text-yellow-900 border border-yellow-300 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-900 mb-3">Legend</p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <p className="text-xs text-gray-700">Confirmed Booking</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <p className="text-xs text-gray-700">Pending Request</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <p className="text-xs text-gray-700">Available</p>
          </div>
        </div>
      </div>

      {/* Modal for date details */}
      {showModal && selectedDate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-6 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {selectedDateBookings.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No events scheduled</p>
            ) : (
              <div className="space-y-3">
                {selectedDateBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {booking.event.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {new Date(booking.event.startDate).toLocaleTimeString(
                        "en-US",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                      • {booking.event.location}
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      Host: {booking.event.host.name}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      ₹{booking.offeredPrice}
                    </p>
                    <p
                      className={`text-xs font-medium mb-3 ${
                        booking.status === "ACCEPTED"
                          ? "text-green-700"
                          : booking.status === "PENDING"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {booking.status === "PENDING" ? "Pending" : booking.status}
                    </p>

                    {booking.status === "PENDING" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptBooking(booking.id)}
                          className="flex-1 bg-gray-900 text-white py-2 rounded text-xs font-medium hover:bg-black transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {booking.status === "ACCEPTED" && (
                      <a
                        href={`https://wa.me/${booking.event.host.id}?text=Hi, regarding your event ${booking.event.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-green-500 text-white py-2 rounded text-xs font-medium hover:bg-green-600 transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}


