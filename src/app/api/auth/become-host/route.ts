import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const HOST_COUPON = "1234567890";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      currentPassword,
      companyName,
      description,
      website,
      coupon,
    } = body;

    // Validate coupon
    if (coupon !== HOST_COUPON) {
      return NextResponse.json(
        { error: "Invalid coupon code" },
        { status: 400 }
      );
    }

    // Get user and verify password
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if password is locked
    if (
      user.passwordLockedUntil &&
      user.passwordLockedUntil > new Date()
    ) {
      return NextResponse.json(
        { error: "Password is locked. Try again after 24 hours." },
        { status: 403 }
      );
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      // Lock password for 24 hours
      const lockedUntil = new Date();
      lockedUntil.setHours(lockedUntil.getHours() + 24);

      await prisma.user.update({
        where: { id: userId },
        data: { passwordLockedUntil: lockedUntil },
      });

      return NextResponse.json(
        { error: "Invalid password. Try again after 24 hours." },
        { status: 401 }
      );
    }

    // Create or update host profile
    await prisma.hostProfile.upsert({
      where: { userId },
      create: {
        userId,
        companyName,
        description,
        website,
      },
      update: {
        companyName,
        description,
        website,
      },
    });

    // Update user role and approval status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "HOST",
        hostApproved: true,
        passwordLockedUntil: null,
      },
    });

    return NextResponse.json(
      { message: "Host profile created successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
