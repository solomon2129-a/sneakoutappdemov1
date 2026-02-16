# Complete User Workflow Guide

## 🔄 Host Journey

### Step 1: Become a Host
**URL**: `/become-host`

**Process**:
1. Fill host details (Company Name, Description, Website)
2. Click "Next" → Confirm password (24-hour lock enabled)
3. Click "Next" → Enter coupon (1234567890)
4. Click "Activate Host Account"
5. Redirects to `/host` dashboard

**Database Updates**:
- Creates HostProfile record
- Sets user.hostApproved = true
- Sets user.role = "HOST"

---

### Step 2: Host Dashboard
**URL**: `/host`

**Features**:
- Real-time stats from database:
  - Total Events created
  - Total Revenue from events
  - Tickets Sold across events
  - Average Rating
- Quick action buttons:
  - "Create New Event"
  - "View Your Events" (Portfolio)
  - "View Analytics"

**Data Source**: Queries Event table where hostId = current user

---

### Step 3: Create Event
**URL**: `/create-event`

**Step 3a - Event Details**:
1. Fill event information:
   - Title (required)
   - Description (required)
   - Location & City (required)
   - Start Date & Time (required)
   - End Date & Time (required)
   - Capacity (required)
   - Ticket Price in ₹ (required)
2. Click "Next: Select Providers"

**Step 3b - Provider Selection**:
1. Page fetches all ProviderProfile records where providerApproved = true
2. Lists providers vertically with:
   - Provider name
   - Category (Venue, Artist, Photographer, etc.)
   - Years of experience
   - Total bookings
   - Rating (stars)
   - Base price in ₹
   - Description
3. Click provider cards to select/deselect (checkbox appears)
4. Click "Create Event"

**Database Operations**:
- Creates Event record:
  - status = "DRAFT"
  - selectedProviders = [array of selected provider IDs]
  - All event details stored
- Creates BookingRequest for each selected provider:
  - status = "PENDING"
  - offeredPrice = event.ticketPrice
  - eventDate = event.startDate
- Redirects to `/host`

---

### Step 4: View Your Events
**URL**: `/host/portfolio`

**Features**:
- Displays all events created by host
- For each event shows:
  - Event image (if available)
  - Title & Description
  - Location & Status
  - Event date & Ticket price
- Status badges:
  - Yellow = DRAFT
  - Green = PUBLISHED
  - Gray = COMPLETED/CANCELLED
- Click event to view details
- Empty state: "Create Your First Event" button

**Data Source**: GET /api/events/by-host?hostId=USER_ID

---

### Step 5: Host Profile
**URL**: `/host/profile`

**Shows**:
- Account Info: Name, Email
- Host Information:
  - Company Name
  - Description
  - Website (if provided)
- Statistics:
  - Total Events
  - Average Rating
- Sign out button

**Data Source**: GET /api/hosts/profile?hostId=USER_ID

---

## 👤 Provider Journey

### Step 1: Become a Provider
**URL**: `/become-provider`

**Process**:
1. Fill provider details:
   - Service Category (dropdown - 8 options)
   - Years of Experience
   - Base Price in ₹
   - Description of services
2. Click "Next" → Confirm password (24-hour lock enabled)
3. Click "Next" → Enter coupon (0987654321)
4. Click "Activate Provider Account"
5. Redirects to `/provider/profile`

**Available Categories**:
- Venue
- Artist/Musician
- Photographer
- Caterer
- DJ
- Decorator
- Event Planner
- Video/Production

**Database Updates**:
- Creates ProviderProfile record
- Sets user.providerApproved = true
- Sets user.role = "PROVIDER"

---

### Step 2: Provider Profile
**URL**: `/provider/profile`

**Shows**:
- Account information
- Provider profile data
- Performance statistics

---

### Step 3: Provider Calendar
**URL**: `/provider/calendar`

**Features**:

#### Calendar View:
- Monthly calendar grid
- Color-coded dates:
  - **Yellow**: Pending booking requests (PENDING status)
  - **Green**: Confirmed bookings (ACCEPTED status)
  - **Gray**: Available dates (no bookings)
- Navigation: Previous/Next month buttons
- Legend explaining colors

#### Date Interaction:

**If clicking empty date (gray)**:
```
Popup shows:
┌─────────────────────────┐
│ Monday, February 10     │
├─────────────────────────┤
│ No events scheduled     │
│                         │
│ [Close]                 │
└─────────────────────────┘
```

**If clicking pending date (yellow)**:
```
Popup shows:
┌─────────────────────────────────────┐
│ Saturday, February 15               │
├─────────────────────────────────────┤
│ Summer Music Festival               │
│ 10:00 PM • Downtown                 │
│ Host: Alex Chen                     │
│ ₹850 offered                        │
│ Status: Pending                     │
│                                     │
│ [Accept]  [Decline]                │
├─────────────────────────────────────┤
│ Tech Conference Gala                │
│ 9:00 PM • Marina Bay                │
│ Host: Sarah Johnson                 │
│ ₹1200 offered                       │
│ Status: Pending                     │
│                                     │
│ [Accept]  [Decline]                │
│                                     │
│ [Close]                             │
└─────────────────────────────────────┘
```

**If clicking accepted date (green)**:
```
Popup shows:
┌─────────────────────────────────────┐
│ Tuesday, February 18                │
├─────────────────────────────────────┤
│ Jazz Night Live                     │
│ 8:30 PM • Concert Hall              │
│ Host: Mike Wilson                   │
│ ₹1500 offered                       │
│ Status: Accepted                    │
│                                     │
│ [Chat on WhatsApp]                 │
│                                     │
│ [Close]                             │
└─────────────────────────────────────┘
```

#### Actions:
- **Accept**: 
  - Updates BookingRequest.status = "ACCEPTED"
  - Sets BookingRequest.responseDate = now
  - Calendar updates date to green
  
- **Decline**: 
  - Updates BookingRequest.status = "REJECTED"
  - Sets BookingRequest.responseDate = now
  - Calendar updates - date removed

- **Chat on WhatsApp**:
  - Opens WhatsApp with host
  - Pre-filled message with event details

**Data Source**: 
- GET /api/bookings/by-provider?providerId=USER_ID&month=X&year=Y (monthly view)
- GET /api/bookings/by-date?providerId=USER_ID&date=YYYY-MM-DD (date details)

---

## 📊 Data Flow Diagram

```
HOST ACTIVATION
├─ /become-host (3 steps)
│  ├─ Step 1: Collect details
│  ├─ Step 2: Verify password
│  ├─ Step 3: Validate coupon (1234567890)
│  └─ Create: HostProfile, set hostApproved=true
│
PROVIDER ACTIVATION
├─ /become-provider (3 steps)
│  ├─ Step 1: Collect details + category
│  ├─ Step 2: Verify password
│  ├─ Step 3: Validate coupon (0987654321)
│  └─ Create: ProviderProfile, set providerApproved=true
│
EVENT CREATION
├─ /create-event (2 steps)
│  ├─ Step 1: Fill event details
│  ├─ Step 2: Select multiple providers
│  ├─ Create: Event (status=DRAFT)
│  └─ Create: BookingRequest for each provider (status=PENDING)
│
PROVIDER BOOKING
├─ /provider/calendar
│  ├─ Fetch: All BookingRequest for this provider
│  ├─ Show: Calendar with color-coded dates
│  ├─ Action: Accept/Reject
│  └─ Update: BookingRequest.status → ACCEPTED/REJECTED
│
CONFIRMATION
├─ Calendar: Yellow (pending) → Green (accepted)
├─ Show: Host details + WhatsApp button
└─ Communication: Provider & Host via WhatsApp
```

---

## 🔐 Security Features

### Password Protection
- **First 2 Steps**: No password verification
- **Final Step**: Password required + coupon validation
- **Failed Attempts**: 3 incorrect attempts = 24-hour lock
- **Lock Mechanism**: passwordLockedUntil field in User

### Data Validation
- All form inputs validated before submission
- Coupon codes exactly matched (case-sensitive)
- Category must be from predefined list
- Dates validated (end > start)
- Price must be positive number

### Authorization
- hostApproved=true required to access /host/*
- providerApproved=true required to access /provider/*
- Users can only view/modify their own data
- API endpoints verify userId ownership

---

## 🎯 Event Lifecycle

```
HOST CREATES EVENT (DRAFT)
       ↓
SELECTS PROVIDERS → BookingRequest created (PENDING) for each
       ↓
PROVIDER SEES YELLOW DATE
       ↓
PROVIDER ACCEPTS → BookingRequest.status = ACCEPTED
       ↓
DATE TURNS GREEN on calendar
       ↓
AFTER ALL PROVIDERS ACCEPT → Event ready to go LIVE
       ↓
HOST & PROVIDER COMMUNICATE VIA WHATSAPP
       ↓
EVENT DAY ARRIVES
       ↓
EVENT MARKED COMPLETED
```

---

## 📱 Mobile Responsiveness

All pages are mobile-optimized with:
- Full-width forms on small screens
- Stacked layouts for provider selection
- Bottom navigation for easy access
- Touch-friendly buttons and inputs
- Scrollable lists for long content

---

## ⚡ Performance Considerations

### Optimized Queries
- Indexed fields: email, hostId, providerId, status, eventDate
- Batch loading: Multiple providers loaded once
- Pagination: Calendar pagination by month
- Caching: Consider adding Redis for calendar data

### Data Limits
- Calendar: Monthly view (efficient)
- Provider list: All providers shown (may need pagination for 1000+)
- Event list: By host (filtered query)

---

## 📝 Error Handling

### User-Friendly Error Messages
- "Invalid coupon code"
- "Password is locked. Try again after 24 hours."
- "Invalid password. Try again after 24 hours."
- "No providers available"
- "No events scheduled"

### Technical Errors
- 400: Bad request (missing fields, invalid data)
- 401: Unauthorized (password locked, invalid auth)
- 403: Forbidden (insufficient permissions)
- 404: Not found (resource doesn't exist)
- 500: Server error (database/processing issues)

---

**Complete workflow covers all user paths from onboarding to booking confirmation.**
