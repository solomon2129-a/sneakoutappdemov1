import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const providerId = searchParams.get("providerId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!providerId || !month || !year) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const startDate = new Date(
      parseInt(year),
      parseInt(month),
      1
    );
    const endDate = new Date(
      parseInt(year),
      parseInt(month) + 1,
      0,
      23,
      59,
      59
    );

    const bookings = await prisma.bookingRequest.findMany({
      where: {
        providerId,
        eventDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        event: true,
        provider: true,
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
