# 🚀 Sneakout PWA - Quick Start

## 30-Second Setup

```bash
# You're already done! Dev server is running
# Visit: http://localhost:3000
```

## What You Get Right Now

### ✨ Live Pages
- **Events Page** (`/events`) - Event discovery with skeleton loaders
- **Create Event** (`/create-event`) - Full event creation form
- **Host Dashboard** (`/host`) - Stats and event management
- **My Tickets** (`/tickets`) - Purchased tickets display
- **Profile** (`/profile`) - User profile & settings
- **Login/Signup** (`/login`, `/signup`) - Auth pages
- **Offline** (`/offline`) - Offline fallback page

### 📱 PWA Ready
- Install button shows (top-right on Chrome/Android)
- Service worker registered and caching assets
- Manifest configured for standalone app
- iOS home screen support
- Offline page ready

### 🎨 Dark Theme
- Black background
- White text
- Gray accents
- Mobile responsive
- Ready for customization

## Navigation

**Bottom Tab Bar:**
- 🎪 Events - Browse all events
- 🎫 Tickets - My purchased tickets
- 📊 Host - Host dashboard
- 👤 Profile - User profile

## Key Files for Development

### Pages to Build Out
- `/src/app/events/[id]/page.tsx` - Event detail page
- `/src/app/signup/page.tsx` - Sign up form

### API Routes to Create
```typescript
// /src/app/api/events/route.ts
// /src/app/api/events/[id]/route.ts
// /src/app/api/tickets/route.ts
// /src/app/api/user/route.ts
```

### Forms Already Built
- Create event form (inputs for all event fields)
- Ready for API integration

### Components Available
```typescript
// Use these in your pages:
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { EventCard } from "@/components/EventCard";
import { SkeletonLoader } from "@/components/SkeletonLoader";
```

## Testing Checklist

- [ ] Visit `http://localhost:3000`
- [ ] Check bottom nav works
- [ ] Click "Install Sneakout" button (Chrome/Android only)
- [ ] Check `/offline` page
- [ ] Open DevTools → Application → Service Worker (should be "activated")
- [ ] Test mobile view (F12 → Toggle device toolbar)

## Environment Variables

Check `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Database Ready

When you're ready to integrate:
```bash
npx prisma migrate dev --name init
npx prisma studio  # View database GUI
```

## Common Tasks

### Add a New Page
```typescript
// /src/app/mypage/page.tsx
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <Navbar title="My Page" />
      {/* Content here */}
      <BottomNav />
    </div>
  );
}
```

### Create API Route
```typescript
// /src/app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: Fetch from database
  return NextResponse.json({ events: [] });
}

export async function POST(request: NextRequest) {
  // TODO: Create in database
  return NextResponse.json({ success: true });
}
```

### Use Dark Theme Colors
```typescript
// Backgrounds
className="bg-gray-900"      // Dark
className="bg-gray-800"      // Slightly lighter

// Text
className="text-white"       // Main text
className="text-gray-400"    // Secondary text
className="text-gray-500"    // Tertiary text

// Borders
className="border-gray-700"  // Borders
```

## Styling Tips

- Use `pb-20` on pages with BottomNav to prevent overlap
- Use `sticky top-0 z-40` for Navbar to keep it visible
- Use `flex flex-col items-center justify-center` for centering
- Mobile first: `text-lg sm:text-2xl md:text-3xl`

## Authentication

Test credentials:
- Email: `test@example.com`
- Password: `password`

When integrating with database:
1. Create user in Prisma
2. Hash password with bcryptjs
3. Update `/src/lib/auth.ts` to query database

## Next Steps

### Immediate
1. Connect to database (Prisma)
2. Implement event API endpoints
3. Build event detail page
4. Implement ticket booking

### Short Term
5. Add user authentication
6. Integrate Razorpay for payments
7. Build QR code system
8. Implement reviews/ratings

### Medium Term
9. Add event search/filters
10. Build host analytics
11. Implement push notifications
12. Add social features

## Helpful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build
npx prisma studio       # Open database GUI
npx prisma generate     # Generate Prisma client
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)

## What's Already Built

✅ PWA infrastructure  
✅ Dark theme styling  
✅ Mobile responsive layout  
✅ Component library  
✅ Database schema  
✅ Auth configuration  
✅ Service worker  
✅ Type definitions  

**Everything is wired up. You just need to:**
1. Connect the database
2. Write the API endpoints
3. Hook up the forms to APIs

## Troubleshooting

**Service Worker not showing?**
- Check DevTools → Application → Service Worker
- Should say "activated"
- Hard refresh (Cmd+Shift+R)

**Page not loading?**
- Check browser console for errors
- Check terminal output
- Try hard refresh

**Changes not appearing?**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear cache: DevTools → Application → Cache Storage

---

You're all set! Start building. 🚀
