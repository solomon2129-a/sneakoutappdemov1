# API Reference - Quick Guide

## Authentication Endpoints

### Become Host
```
POST /api/auth/become-host
Content-Type: application/json

{
  "userId": "firebase_user_id",
  "currentPassword": "user_password",
  "companyName": "My Event Company",
  "description": "We organize amazing events",
  "website": "https://example.com",
  "coupon": "1234567890"
}

Response:
{
  "message": "Host profile created successfully",
  "user": { ...user object }
}

Error:
{
  "error": "Invalid coupon code" | "Password is locked" | "Invalid password"
}
```

### Become Provider
```
POST /api/auth/become-provider
Content-Type: application/json

{
  "userId": "firebase_user_id",
  "currentPassword": "user_password",
  "category": "Venue",  // or Artist, Photographer, Caterer, DJ, Decorator, Event Planner, Video/Production
  "experience": "5",
  "basePrice": "50000",
  "description": "Premium event venue with 500 capacity",
  "coupon": "0987654321"
}

Response:
{
  "message": "Provider profile created successfully",
  "user": { ...user object }
}

Error:
{
  "error": "Invalid coupon code" | "Password is locked" | "Invalid password"
}
```

---

## Event Endpoints

### Create Event
```
POST /api/events/create
Content-Type: application/json

{
  "title": "Summer Music Festival",
  "description": "A 3-day music festival",
  "location": "Downtown Park",
  "city": "Mumbai",
  "startDate": "2026-06-15T19:00:00",
  "endDate": "2026-06-17T23:59:00",
  "capacity": "1000",
  "ticketPrice": "500",
  "hostId": "user_id",
  "status": "DRAFT",
  "selectedProviders": ["provider_id_1", "provider_id_2"]
}

Response:
{
  "id": "event_id",
  "title": "Summer Music Festival",
  "status": "DRAFT",
  ...
}
```

### Get Host Events
```
GET /api/events/by-host?hostId=USER_ID

Response:
[
  {
    "id": "event_id",
    "title": "Summer Music Festival",
    "status": "DRAFT",
    "startDate": "2026-06-15T19:00:00",
    "capacity": 1000,
    "ticketPrice": 500,
    "location": "Downtown Park",
    ...
  }
]
```

---

## Booking Endpoints

### Create Booking Request
```
POST /api/bookings/create
Content-Type: application/json

{
  "eventId": "event_id",
  "providerId": "provider_user_id",
  "offeredPrice": 10000
}

Response:
{
  "id": "booking_id",
  "eventId": "event_id",
  "providerId": "provider_id",
  "status": "PENDING",
  "offeredPrice": 10000,
  "eventDate": "2026-06-15T19:00:00"
}
```

### Update Booking Status
```
PATCH /api/bookings/update-status
Content-Type: application/json

{
  "bookingId": "booking_id",
  "status": "ACCEPTED"  // or REJECTED, COMPLETED
}

Response:
{
  "id": "booking_id",
  "status": "ACCEPTED",
  "responseDate": "2026-02-04T10:30:00"
}
```

### Get Provider Bookings (by Month)
```
GET /api/bookings/by-provider?providerId=USER_ID&month=5&year=2026

Response:
[
  {
    "id": "booking_id",
    "eventId": "event_id",
    "providerId": "provider_id",
    "status": "PENDING",
    "offeredPrice": 10000,
    "eventDate": "2026-06-15T19:00:00",
    "event": {
      "id": "event_id",
      "title": "Summer Music Festival",
      "startDate": "2026-06-15T19:00:00",
      "location": "Downtown Park"
    }
  }
]
```

### Get Provider Bookings (by Date)
```
GET /api/bookings/by-date?providerId=USER_ID&date=2026-06-15

Response:
[
  {
    "id": "booking_id",
    "status": "PENDING",
    "offeredPrice": 10000,
    "eventDate": "2026-06-15",
    "event": {
      "id": "event_id",
      "title": "Summer Music Festival",
      "startDate": "2026-06-15T19:00:00",
      "location": "Downtown Park",
      "host": {
        "id": "host_id",
        "name": "Alex Chen",
        "email": "alex@example.com",
        "phone": "+91-9876543210"
      }
    }
  }
]
```

---

## Provider Endpoints

### Get Providers List
```
GET /api/providers/list
GET /api/providers/list?category=Venue

Response:
[
  {
    "id": "provider_profile_id",
    "userId": "user_id",
    "category": "Venue",
    "experience": 5,
    "basePrice": 50000,
    "rating": 4.8,
    "totalBookings": 42,
    "portfolio": ["url1", "url2"],
    "description": "Premium venue...",
    "user": {
      "id": "user_id",
      "name": "Raj Patel",
      "email": "raj@example.com",
      "phone": "+91-9876543210",
      "avatar": "url"
    }
  }
]
```

---

## Host Endpoints

### Get Host Profile
```
GET /api/hosts/profile?hostId=USER_ID

Response:
{
  "id": "profile_id",
  "userId": "user_id",
  "companyName": "My Event Company",
  "description": "We organize amazing events",
  "website": "https://example.com",
  "totalEvents": 5,
  "totalRevenue": 250000,
  "averageRating": 4.5,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  }
}
```

---

## Error Codes

| Code | Message | Reason |
|------|---------|--------|
| 400 | Missing required parameters | Invalid request data |
| 401 | Invalid password | Wrong password entered |
| 401 | Password is locked | 24-hour lockout active |
| 400 | Invalid coupon code | Wrong coupon entered |
| 404 | User not found | UserId doesn't exist |
| 404 | Host profile not found | No host profile created |
| 404 | Event not found | EventId doesn't exist |
| 500 | Internal server error | Database or processing error |

---

## Status Values

### Event Status
- `DRAFT` - Event created, awaiting provider confirmation
- `PUBLISHED` - Ready for public
- `LIVE` - Event is ongoing
- `COMPLETED` - Event finished
- `CANCELLED` - Event cancelled

### Booking Status
- `PENDING` - Awaiting provider response
- `ACCEPTED` - Provider accepted
- `REJECTED` - Provider rejected
- `COMPLETED` - Booking completed

---

## Provider Categories

Available categories for providers:
1. Venue
2. Artist/Musician
3. Photographer
4. Caterer
5. DJ
6. Decorator
7. Event Planner
8. Video/Production

---

## Authentication Flow

```
1. User creates account (Firebase)
   ↓
2. User goes to /become-host or /become-provider
   ↓
3. Step 1: Fill details
   ↓
4. Step 2: Verify password (24-hour lock mechanism)
   ↓
5. Step 3: Enter coupon code
   - Host: 1234567890
   - Provider: 0987654321
   ↓
6. API creates profile + sets approval flag
   ↓
7. User can now use host/provider features
```

---

## Data Format Reference

### Date Format
- Input: `YYYY-MM-DDTHH:mm:ss`
- Example: `2026-06-15T19:00:00`

### Currency
- All prices in ₹ (Indian Rupees)
- Example: 50000

### Price Fields
- basePrice (provider's base rate)
- ticketPrice (event ticket price)
- offeredPrice (offer made to provider for specific event)

---

## Pagination Note

Current implementation returns all results. For 1000+ records, consider adding pagination parameters:

```
GET /api/providers/list?page=1&limit=20
GET /api/events/by-host?hostId=USER_ID&page=1&limit=10
```

---

## Rate Limiting

No rate limiting implemented. Consider adding:
- Max 100 requests/minute per IP
- Max 10 requests/second per user
- Exponential backoff on errors

---

## CORS Configuration

Make sure your CORS settings allow:
- Origin: Your frontend domain
- Methods: GET, POST, PUT, PATCH, DELETE
- Headers: Content-Type, Authorization

---

## Testing with cURL

```bash
# Create event
curl -X POST http://localhost:3000/api/events/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Event","hostId":"user123",...}'

# Get providers
curl http://localhost:3000/api/providers/list

# Accept booking
curl -X PATCH http://localhost:3000/api/bookings/update-status \
  -H "Content-Type: application/json" \
  -d '{"bookingId":"booking123","status":"ACCEPTED"}'
```

---

**Last Updated: February 2026**
**API Version: 1.0.0**
