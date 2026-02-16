import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, providerId, offeredPrice } = body;

    // Create booking request
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        eventId,
        providerId,
        offeredPrice,
        eventDate: event.startDate,
      },
    });

    return NextResponse.json(bookingRequest, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
