export interface User {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  role: "ATTENDEE" | "HOST" | "PROVIDER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string | null;
  startDate: Date;
  endDate: Date;
  location: string;
  city: string;
  capacity: number;
  ticketPrice: number;
  status: "DRAFT" | "PUBLISHED" | "LIVE" | "CANCELLED" | "COMPLETED";
  hostId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  qrCode: string;
  used: boolean;
  usedAt: Date | null;
  eventId: string;
  userId: string;
  paymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  razorpayId: string | null;
  eventId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
