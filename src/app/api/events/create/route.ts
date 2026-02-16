import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      location,
      city,
      startDate,
      endDate,
      capacity,
      ticketPrice,
      hostId,
      status = "DRAFT",
      selectedProviders = [],
    } = body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        city,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        capacity: parseInt(capacity),
        ticketPrice: parseFloat(ticketPrice),
        hostId,
        status,
        selectedProviders,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
