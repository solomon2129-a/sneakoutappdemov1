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

    const hostProfile = await prisma.hostProfile.findUnique({
      where: { userId: hostId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    if (!hostProfile) {
      return NextResponse.json(
        { error: "Host profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hostProfile, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
