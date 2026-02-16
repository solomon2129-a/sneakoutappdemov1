-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ATTENDEE',
    "hostApproved" BOOLEAN NOT NULL DEFAULT false,
    "providerApproved" BOOLEAN NOT NULL DEFAULT false,
    "passwordLockedUntil" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "ticketPrice" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "selectedProviders" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hostId" TEXT NOT NULL,
    CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qrCode" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT,
    CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ticket_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Review_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "razorpayId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Payment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HostProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "description" TEXT,
    "website" TEXT,
    "totalEvents" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" REAL NOT NULL DEFAULT 0,
    "averageRating" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HostProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProviderProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "basePrice" REAL NOT NULL DEFAULT 0,
    "portfolio" TEXT NOT NULL DEFAULT '',
    "rating" REAL NOT NULL DEFAULT 0,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProviderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "offeredPrice" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "requestDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseDate" DATETIME,
    "eventDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BookingRequest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BookingRequest_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "whatsappUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Event_hostId_idx" ON "Event"("hostId");

-- CreateIndex
CREATE INDEX "Event_city_idx" ON "Event"("city");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_qrCode_key" ON "Ticket"("qrCode");

-- CreateIndex
CREATE INDEX "Ticket_eventId_idx" ON "Ticket"("eventId");

-- CreateIndex
CREATE INDEX "Ticket_userId_idx" ON "Ticket"("userId");

-- CreateIndex
CREATE INDEX "Ticket_qrCode_idx" ON "Ticket"("qrCode");

-- CreateIndex
CREATE INDEX "Review_eventId_idx" ON "Review"("eventId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpayId_key" ON "Payment"("razorpayId");

-- CreateIndex
CREATE INDEX "Payment_eventId_idx" ON "Payment"("eventId");

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_razorpayId_idx" ON "Payment"("razorpayId");

-- CreateIndex
CREATE UNIQUE INDEX "HostProfile_userId_key" ON "HostProfile"("userId");

-- CreateIndex
CREATE INDEX "HostProfile_userId_idx" ON "HostProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_userId_key" ON "ProviderProfile"("userId");

-- CreateIndex
CREATE INDEX "ProviderProfile_userId_idx" ON "ProviderProfile"("userId");

-- CreateIndex
CREATE INDEX "ProviderProfile_category_idx" ON "ProviderProfile"("category");

-- CreateIndex
CREATE INDEX "BookingRequest_eventId_idx" ON "BookingRequest"("eventId");

-- CreateIndex
CREATE INDEX "BookingRequest_providerId_idx" ON "BookingRequest"("providerId");

-- CreateIndex
CREATE INDEX "BookingRequest_status_idx" ON "BookingRequest"("status");

-- CreateIndex
CREATE INDEX "BookingRequest_eventDate_idx" ON "BookingRequest"("eventDate");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");
