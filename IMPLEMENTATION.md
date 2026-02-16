# Sneakout App - Implementation Summary

## Overview
Sneakout is a Firebase-based ticketing platform with three sectors (Attend/Host/Provide) and role-based access control. Users start as "attendee" and can request access to host events or provide services.

## Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email + Google)
- **Styling**: Tailwind CSS (Dark/Light Grey Only)
- **Theme**: Minimalist - Dark Grey (#1a1a1a), Light Grey (#f5f5f5), Black/White

### Key Features
✅ User authentication (Email + Google Sign-In)
✅ Role-based access control (Attendee/Host/Provider)
✅ Sector switching with approval workflow
✅ Request submission for host/provider access
✅ Attendee UI with bottom navigation
✅ Sidebar sector switcher
✅ Grey-scale theme only (no colors)
✅ No emojis (icons only)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with AuthContext provider
│   ├── page.tsx                # Landing page (public)
│   ├── login/page.tsx          # Login page
│   ├── signup/page.tsx         # Sign up page
│   ├── home/page.tsx           # Attendee home (event feed)
│   ├── search/page.tsx         # Event search
│   ├── profile/page.tsx        # User profile
│   ├── request-host/page.tsx   # Host access request form
│   └── request-provider/page.tsx # Provider access request form
├── components/
│   ├── Sidebar.tsx             # Sector switcher & sign out
│   └── BottomNav.tsx           # Home/Search/Profile navigation
├── context/
│   └── AuthContext.tsx         # Firebase auth & user state management
├── lib/
│   └── firebase.ts             # Firebase initialization
└── public/
    └── mainlogo.png            # Sneakout logo
```

---

## Authentication Flow

### Landing Page (`/`)
- Shows Sneakout logo and tagline
- Redirects authenticated users to `/home`
- Login and Signup buttons

### Sign Up (`/signup`)
1. User enters name, email, password
2. Firebase Auth creates user account
3. Firestore document created with default role "attendee"
4. Initial approvals set to false
5. Redirects to `/home`

### Login (`/login`)
- Email + Password OR Google Sign-In
- Fetches user profile from Firestore
- Redirects to `/home`

---

## User Model (Firestore)

```
users/{userId}
├── email: string
├── name: string
├── photoURL: string | null
├── role: "attendee" | "host" | "provide"
├── hostApproved: boolean
├── providerApproved: boolean
└── createdAt: Timestamp
```

## Request Collections

```
hostRequests/{userId}
├── userId: string
├── userEmail: string
├── userName: string
├── reason: string
├── status: "pending" | "approved" | "rejected"
└── createdAt: Timestamp

providerRequests/{userId}
├── userId: string
├── userEmail: string
├── userName: string
├── reason: string
├── status: "pending" | "approved" | "rejected"
└── createdAt: Timestamp
```

---

## Component Details

### AuthContext (`/src/context/AuthContext.tsx`)
Manages global auth state including:
- `user`: Firebase User object
- `userProfile`: User document from Firestore
- `sector`: Current sector ("attend", "host", "provide")
- `canAccess(sector)`: Permission checking method
- `setSector(sector)`: Change current sector
- `signOut()`: Firebase sign out

### BottomNav (`/src/components/BottomNav.tsx`)
Three tabs for attendee experience:
- **Home**: Event feed
- **Search**: Event search
- **Profile**: User settings & profile info

### Sidebar (`/src/components/Sidebar.tsx`)
Logo click opens sidebar showing:
- **Attend**: Always accessible
- **Host**: Shows "Request access" if not approved
- **Provide**: Shows "Request access" if not approved
- **Sign Out**: Firebase logout

---

## Pages & Routes

### Public Routes
- `/`: Landing page
- `/login`: Login page
- `/signup`: Sign up page

### Protected Routes (Auth Required)
- `/home`: Attendee home page
- `/search`: Event search
- `/profile`: User profile
- `/request-host`: Host access request form
- `/request-provider`: Provider access request form

---

## Styling & Theme

### Color Palette (Tailwind)
- Dark backgrounds: `#1a1a1a` (`bg-gray-900`)
- Light backgrounds: `#f5f5f5` (`bg-gray-100`)
- Surfaces: `#ffffff` (white)
- Borders: `#e0e0e0` or `#3a3a3a`
- Text: `text-gray-900` (dark), `text-gray-600` (light)

### Design Principles
✅ Minimalist, clean UI
✅ NO colors - grey scale only
✅ NO emojis - icons allowed
✅ Modern typography
✅ Dark mode friendly

---

## Next Steps (TODO)

### High Priority
1. **Event Creation** (Host only)
   - Create event form
   - Event details: name, date, location, capacity, price
   - Store in Firestore `events/` collection

2. **Event Feed** (Attendee)
   - Display events from Firestore
   - Event cards with image, title, date, location, price
   - Click to view details

3. **Event Search**
   - Filter by category, date, location
   - Real-time search functionality

4. **Host Dashboard**
   - View created events
   - Event analytics (tickets sold, revenue)
   - Manage event details

5. **Provider Dashboard**
   - List available services
   - View bookings
   - Calendar integration

### Medium Priority
1. Event detail page
2. Ticket purchase flow
3. My tickets page
4. Provider booking system
5. Payment integration

### Low Priority
1. Dark mode toggle
2. Push notifications
3. Event reviews/ratings
4. Social sharing
5. Advanced analytics

---

## Running the App

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app runs on `http://localhost:3000`

---

## Firebase Configuration

The app uses the following Firebase services:
- **Authentication**: Email + Password + Google
- **Firestore**: User documents, events, requests
- **Analytics**: (Disabled for now)

Credentials are stored in code (for development). For production, use environment variables.

---

## Important Notes

1. **Role System**: Users always start as "attendee". Host and Provider roles require founder approval.

2. **Sector Switching**: Users can switch between approved sectors using the sidebar. Unapproved sectors show "Request access" button.

3. **No Colors**: The entire app uses only grey scale. No color accents or highlights anywhere.

4. **No Emojis**: All UI uses proper icons instead of emojis. Icons are sourced from inline SVGs.

5. **Mobile First**: The UI is designed mobile-first with bottom navigation for easy thumb access.

---

## Development Notes

- **Loading States**: All async operations show loading indicators
- **Error Handling**: Firebase errors are caught and displayed to users
- **Auth Protection**: Auth context checks are done on every protected route
- **Firestore Security**: Rules need to be set up to protect user data
- **Analytics**: Firebase Analytics is initialized but not actively used

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Foundation Complete - Ready for Feature Development

### ✅ Authentication Ready
- NextAuth.js v5 configuration
- Credentials provider setup
- JWT session strategy
- Test credentials: `test@example.com` / `password`

### ✅ Database Schema (Prisma)
```
User (id, email, name, bio, avatar, phone, address, city, role)
Event (id, title, description, image, startDate, endDate, location, city, capacity, ticketPrice, status, hostId)
Ticket (id, qrCode, used, usedAt, eventId, userId, paymentId)
Payment (id, amount, currency, status, razorpayId, eventId, userId)
Review (id, rating, comment, eventId, userId)
```

### ✅ Core App Pages
- `/` → Redirects to `/events`
- `/events` - Event discovery (listable, searchable)
- `/events/[id]` - Event detail (TODO)
- `/create-event` - Host event creation form
- `/host` - Host dashboard with stats
- `/tickets` - My purchased tickets
- `/profile` - User profile & settings
- `/login` - Authentication page
- `/signup` - Registration page (TODO)
- `/offline` - Offline fallback page

### ✅ UI Components
- `Navbar` - Top navigation with back button
- `BottomNav` - Tab bar navigation (Events, Tickets, Host, Profile)
- `EventCard` - Reusable event card component
- `SkeletonLoader` - Loading state component
- `PWAInstall` - Install prompt logic

### ✅ Styling
- Dark theme (black backgrounds)
- Off-white text (`text-white`)
- Gray accents (`gray-800`, `gray-400`)
- Mobile-first responsive design
- Tailwind CSS configured

### ✅ Type Safety
- TypeScript throughout
- Type definitions in `/src/types`
- Prisma schema with strict typing

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Local Development

1. **Start dev server**
```bash
npm run dev
```
Visit: `http://localhost:3000`

2. **Build for production**
```bash
npm run build
npm start
```

3. **Database Setup (When Ready)**
```bash
npx prisma migrate dev --name init
npx prisma studio  # View/edit data
```

## 🔧 Project Structure

```
src/
├── app/
│   ├── api/auth/[auth0]/        # NextAuth routes
│   ├── events/page.tsx           # Event listing
│   ├── events/[id]/page.tsx      # Event detail (TODO)
│   ├── create-event/page.tsx     # Create event form
│   ├── host/page.tsx             # Host dashboard
│   ├── tickets/page.tsx          # My tickets
│   ├── profile/page.tsx          # User profile
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page (TODO)
│   ├── offline/page.tsx          # Offline fallback
│   ├── layout.tsx                # Root layout with PWA meta tags
│   └── page.tsx                  # Home (redirect to events)
│
├── components/
│   ├── PWAInstall.tsx            # Install prompt logic
│   ├── Navbar.tsx                # Top nav
│   ├── BottomNav.tsx             # Tab navigation
│   ├── EventCard.tsx             # Event card component
│   ├── SkeletonLoader.tsx        # Loading skeleton
│   └── FlipWords.tsx             # Animated text
│
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client instance
│   └── utils.ts                  # Helper functions
│
├── types/
│   └── index.ts                  # TypeScript types
│
└── styles/
    └── globals.css               # Global styles

prisma/
└── schema.prisma                 # Database schema

public/
├── manifest.json                 # PWA manifest
├── sw.js                         # Service worker
└── icons/
    ├── icon-192x192.svg
    └── icon-512x512.svg
```

## 📱 PWA Features

### Installation
The app is installable on:
- ✅ Android Chrome
- ✅ iOS Safari (via "Add to Home Screen")
- ✅ Desktop Chrome/Edge
- ✅ Windows/Mac

### Offline Support
- Static assets cached on first load
- Images use cache-first strategy
- API calls use network-first strategy
- Offline page shown when network fails

### App Manifest
```json
{
  "name": "Sneakout - Underground Culture Events",
  "short_name": "Sneakout",
  "display": "standalone",  // Full-screen app mode
  "theme_color": "#000000",
  "background_color": "#000000",
  "start_url": "/"
}
```

## 🔐 Authentication (NextAuth.js)

### Current Setup
- Credentials provider (email/password)
- Test account: `test@example.com` / `password`
- JWT session strategy
- Protected routes ready

### Integration Points
- Database: User table stores hashed passwords
- Sessions: JWT tokens
- Callbacks: jwt() & session()

### Next Steps
1. Implement signup API (`/api/auth/signup`)
2. Add password hashing (bcryptjs ready)
3. Integrate Prisma for user queries
4. Add email verification

## 💾 Database Setup (When Ready)

1. **Install SQLite** (optional, or use PostgreSQL)
```bash
npm install @prisma/client @prisma/cli
```

2. **Update .env.local**
```env
DATABASE_URL="file:./dev.db"  # SQLite
# OR
DATABASE_URL="postgresql://user:password@localhost:5432/sneakout"  # PostgreSQL
```

3. **Create migrations**
```bash
npx prisma migrate dev --name init
```

4. **Access Prisma Studio**
```bash
npx prisma studio
```

## 🛠️ API Endpoints (To Implement)

### Events API
```
GET    /api/events              # List events
POST   /api/events              # Create event (Host only)
GET    /api/events/[id]         # Get event details
PATCH  /api/events/[id]         # Update event
DELETE /api/events/[id]         # Delete event
```

### Tickets API
```
GET    /api/tickets             # Get user's tickets
POST   /api/tickets             # Book ticket
POST   /api/tickets/[id]/validate  # Validate QR code
```

### Auth API
```
POST   /api/auth/signup         # Register user
POST   /api/auth/login          # Login (handled by NextAuth)
POST   /api/auth/logout         # Logout (handled by NextAuth)
GET    /api/auth/session        # Get current session
```

### User API
```
GET    /api/user                # Get profile
PATCH  /api/user                # Update profile
GET    /api/user/events         # Get user's hosted events
```

## 💳 Payment Ready (Razorpay)

Database structure ready for:
- Payment tracking
- Razorpay integration
- Ticket generation on successful payment

To implement:
1. Add Razorpay keys to `.env.local`
2. Install: `npm install razorpay`
3. Create payment flow in `/api/payments`
4. Update ticket creation logic

## 🎨 Dark Theme Customization

### Colors
- Background: `bg-gray-900` (#111827)
- Surface: `bg-gray-800` (#1f2937)
- Text: `text-white` & `text-gray-400`
- Accents: `border-gray-700`

### Update Theme
Edit `tailwind.config.ts` to customize colors:
```typescript
theme: {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    // ...
  }
}
```

## 📊 Development Workflow

### Running Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Run production build
npm run lint         # Lint code
```

### Type Checking
```bash
npm run build        # Full TypeScript check
```

### Database Management
```bash
npx prisma studio   # GUI for database
npx prisma migrate  # Create migrations
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- Railway
- Render
- AWS, GCP, Azure

### Environment Variables
Set these on your hosting platform:
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RAZORPAY_KEY=
RAZORPAY_SECRET=
```

## 📋 Next Steps / TODO

### High Priority
- [ ] Implement event API endpoints (`/api/events`)
- [ ] Implement ticket booking flow
- [ ] Integrate Razorpay for payments
- [ ] Add event search/filter
- [ ] Implement database migrations

### Medium Priority
- [ ] User signup/registration
- [ ] Password reset flow
- [ ] Event image uploads
- [ ] Review/rating system
- [ ] Host analytics dashboard

### Nice to Have
- [ ] Social sharing
- [ ] Event recommendations
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Fraud detection
- [ ] Accessibility improvements

## 🧪 Testing

### Manual Testing Checklist
- [ ] App installs on mobile
- [ ] Offline page shows when offline
- [ ] Service worker caches static assets
- [ ] Navigation works smoothly
- [ ] Forms validate correctly
- [ ] Images load properly
- [ ] Bottom nav navigation works

### Browser DevTools
1. Open DevTools (F12)
2. Application → Manifest (check JSON)
3. Application → Service Worker (check registration)
4. Application → Cache (check cached assets)
5. Mobile Emulation (test responsive)

## 📞 Support

For issues:
1. Check error console (F12)
2. Review Prisma logs: set `log: ["query"]` in `prisma.ts`
3. Check service worker registration in Application tab

---

**Built with:** Next.js 16 + TypeScript + Tailwind CSS + Prisma + NextAuth.js

**Status:** MVP Ready - Production Foundation Complete
