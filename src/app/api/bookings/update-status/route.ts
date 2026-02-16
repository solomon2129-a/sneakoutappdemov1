import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    const validStatuses = ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await prisma.bookingRequest.update({
      where: { id: bookingId },
      data: {
        status,
        responseDate: status !== "PENDING" ? new Date() : undefined,
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
