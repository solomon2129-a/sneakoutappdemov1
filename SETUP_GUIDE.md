# Setup & Migration Guide

## Required Actions Before Running

### 1. Install Dependencies
```bash
npm install bcryptjs
# or
yarn add bcryptjs
```

### 2. Update Prisma Schema
The schema.prisma file has been updated with new models:
- HostProfile
- ProviderProfile  
- BookingRequest
- Message

### 3. Create Database Migration
```bash
# Generate migration
npx prisma migrate dev --name add_host_provider_models

# Or if using existing database:
npx prisma db push
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Verify Database Tables
Check that these new tables exist:
- host_profile
- provider_profile
- booking_request
- message

## Environment Variables
Ensure your `.env.local` includes:
```
DATABASE_URL=file:./dev.db  (or your database connection)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ... other Firebase config
```

## Testing the New Features

### Test Host Activation
1. Go to `/become-host`
2. Fill in company details
3. Enter your account password
4. Enter coupon: **1234567890**
5. Should see success and redirect to `/host`

### Test Provider Activation
1. Go to `/become-provider`
2. Fill in provider details (category, experience, price)
3. Enter your account password
4. Enter coupon: **0987654321**
5. Should see success and redirect to `/provider/profile`

### Test Event Creation
1. Go to `/host` dashboard
2. Click "Create New Event"
3. Fill in event details
4. Select providers from list
5. Event should be created in DRAFT status

### Test Provider Calendar
1. Go to `/provider/calendar`
2. Should show real bookings from database
3. Click on pending date (yellow) to see requests
4. Can accept/reject bookings
5. Accepted bookings show WhatsApp button

## API Testing with curl

### Test Host Activation API
```bash
curl -X POST http://localhost:3000/api/auth/become-host \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "currentPassword": "their_password",
    "companyName": "My Company",
    "description": "Event company",
    "website": "https://example.com",
    "coupon": "1234567890"
  }'
```

### Test Provider Activation API
```bash
curl -X POST http://localhost:3000/api/auth/become-provider \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "currentPassword": "their_password",
    "category": "Venue",
    "experience": "5",
    "basePrice": "50000",
    "description": "Premium venue provider",
    "coupon": "0987654321"
  }'
```

### Test Get Providers
```bash
curl "http://localhost:3000/api/providers/list"
curl "http://localhost:3000/api/providers/list?category=Venue"
```

### Test Get Host Events
```bash
curl "http://localhost:3000/api/events/by-host?hostId=USER_ID"
```

## Important Notes

1. **Password Hashing**: Ensure passwords in your User table are hashed with bcryptjs
2. **24-Hour Lock**: After 3 failed password attempts, account locks for 24 hours
3. **Event Status**: New events start as DRAFT, not PUBLISHED
4. **Booking Status**: BookingRequest status changes from PENDING → ACCEPTED → COMPLETED
5. **Firebase Integration**: Still uses Firebase Auth, database stores additional data
6. **Provider Selection**: Multiple providers can be selected per event

## Troubleshooting

### "Table doesn't exist" errors
- Run: `npx prisma db push` to create tables

### "bcryptjs not installed"
- Run: `npm install bcryptjs`

### "Password locked" error
- This is intentional - lock expires after 24 hours
- For testing, you can manually update the user's `passwordLockedUntil` to null in database

### Events not showing
- Ensure events were created with correct hostId
- Check that status is not CANCELLED

### Providers not showing in selection
- Ensure provider was created with role="PROVIDER" and providerApproved=true
- Check that ProviderProfile exists

## Database Queries for Testing

### View all hosts
```sql
SELECT * FROM host_profile;
```

### View all providers
```sql
SELECT * FROM provider_profile;
```

### View all booking requests
```sql
SELECT br.*, e.title, u.name 
FROM booking_request br
JOIN event e ON br.event_id = e.id
JOIN user u ON br.provider_id = u.id;
```

### View events
```sql
SELECT * FROM event WHERE host_id = 'USER_ID';
```

## Next Deployment Steps

1. Run all database migrations
2. Test all APIs with real data
3. Verify no mock data appears in UI
4. Test full workflow: host activation → event creation → provider booking
5. Deploy to production
6. Monitor error logs for any database issues
