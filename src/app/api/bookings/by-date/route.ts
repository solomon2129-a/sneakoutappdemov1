import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const providerId = searchParams.get("providerId");
    const date = searchParams.get("date");

    if (!providerId || !date) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookings = await prisma.bookingRequest.findMany({
      where: {
        providerId,
        eventDate: {
          gte: selectedDate,
          lt: nextDay,
        },
      },
      include: {
        event: {
          include: {
            host: true,
          },
        },
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
