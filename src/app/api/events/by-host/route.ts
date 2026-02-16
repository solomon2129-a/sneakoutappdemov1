import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hostId = searchParams.get("hostId");

    if (!hostId) {
      return NextResponse.json(
        { error: "Missing hostId parameter" },
        { status: 400 }
      );
    }

    const events = await prisma.event.findMany({
      where: { hostId },
      include: {
        host: true,
        bookingRequests: {
          include: {
            provider: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
