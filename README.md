# NextKey Housing Access Foundation - Learning Platform

A production-ready, free-tier friendly educational platform built with Next.js 14, TypeScript, and TailwindCSS for NYC housing education. **Fully bilingual (English/Spanish)** with comprehensive learning tracks for different housing audiences.

## Features

- **🌍 Bilingual Support** - Complete English and Spanish translations with language switcher
- **🎯 Learning Track Selection** - 5 specialized tracks for different housing audiences
- **📧 Email Gate** - Soft gate by email signup with JWT-based access
- **📚 Module System** - 17+ modules across 5 tracks, each with individual pages
- **📊 Progress Tracking** - Mark modules as completed with persistent storage
- **📈 Analytics** - Lightweight event tracking for signups and CTA clicks
- **💬 Feedback System** - User feedback collection with ratings
- **👨‍💼 Admin Dashboard** - Protected admin area with statistics and user export
- **📋 Community Survey** - Integrated survey system for content prioritization
- **🆓 Free Stack** - Vercel Hobby, Neon Postgres, Resend email

## Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT httpOnly cookies
- **Email**: Resend (with console fallback)
- **Deployment**: Vercel
- **Database Hosting**: Neon

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp env.example .env.local
```

Required environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
APP_SECRET="your-secret-key-here"
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="workshop@yourdomain.org"
WORKSHOP_EXTERNAL_URL=""  # Leave blank for internal modules
ADMIN_PASSWORD="your-admin-password"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"  # For production, use your domain
```

### 3. Language Configuration

The platform supports both English and Spanish out of the box. Language preferences are stored in localStorage and persist across sessions. Users can switch languages using the language switcher in the header.

**Supported Languages:**
- 🇺🇸 English (default)
- 🇪🇸 Spanish (Español)

**Translation Files:**
- `lib/i18n.ts` - Main translation system
- `data/modules.ts` - English module content
- `data/modules-es.ts` - Spanish module content

### 4. Database Setup

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Learning Tracks

The platform offers 5 specialized learning tracks for different housing audiences:

### 1. **Tenant & Voucher Holder Track** (4 modules)
- **Audience**: Families & individuals navigating NYC housing programs
- **Duration**: ~6 hours total
- **Modules**: Housing rights, voucher programs, apartment search, housing stability

### 2. **Landlord & Property Manager Track** (4 modules)
- **Audience**: Landlords, property managers, and housing providers
- **Duration**: ~5 hours total
- **Modules**: Voucher benefits, lease-up process, case manager relations, compliance

### 3. **Housing Secrets Track** (4 modules)
- **Audience**: Housing seekers and landlords wanting insider knowledge
- **Duration**: ~5 hours total
- **Modules**: Fast-tracking applications, landlord incentives, networking, additional programs

### 4. **Advocate & Community Track** (4 modules)
- **Audience**: Caseworkers, shelter staff, community leaders, and advocates
- **Duration**: ~6 hours total
- **Modules**: NYC housing systems, advocacy skills, community organizing, policy influence

### 5. **Real Estate Professional Track** (1 comprehensive module)
- **Audience**: Real estate agents, brokers, property managers, and housing professionals
- **Duration**: ~12 hours total + certification
- **Modules**: NYC Voucher Program Specialist Certification

## Deployment

### 1. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### 2. Database Setup (Neon)

1. Create a new project on [Neon](https://neon.tech)
2. Copy the connection string to your `DATABASE_URL`
3. Run migrations: `npm run db:push`

### 3. Email Setup (Resend)

1. Sign up for [Resend](https://resend.com)
2. Get your API key and add to `RESEND_API_KEY`
3. Verify your sender domain and set `EMAIL_FROM`

## Project Structure

```
app/
  page.tsx                        # Landing page
  workshop/page.tsx               # Workshop overview
  modules/[slug]/page.tsx         # Individual module pages
  admin/page.tsx                  # Admin dashboard
  api/
    signup/route.ts              # User signup endpoint
    event/route.ts               # Analytics tracking
    feedback/route.ts            # Feedback submission
    progress/route.ts            # Progress tracking
components/
  SignupModal.tsx                # Email signup modal
  ProgressBar.tsx                # Progress visualization
  ModuleCard.tsx                 # Module display card
  StatCard.tsx                   # Admin statistics card
  AdminAuth.tsx                  # Admin authentication
data/
  modules.ts                     # Module definitions
lib/
  db.ts                          # Prisma client
  jwt.ts                         # JWT utilities
  mailer.ts                      # Email service
  rateLimit.ts                   # Rate limiting
  validate.ts                    # Zod schemas
prisma/
  schema.prisma                  # Database schema
```

## API Endpoints

### POST /api/signup
User registration with email verification.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "consent": true
}
```

### POST /api/event
Track user events and analytics.

**Body:**
```json
{
  "type": "signup" | "clickedStart" | "outboundCourse",
  "meta": {}
}
```

### POST /api/feedback
Submit user feedback.

**Body:**
```json
{
  "message": "Great workshop!",
  "rating": 5,
  "name": "John Doe"
}
```

### POST /api/progress
Mark module as completed.

**Body:**
```json
{
  "moduleSlug": "welcome"
}
```

## Database Schema

- **User** - User accounts with email and name
- **Progress** - Module completion tracking
- **Feedback** - User feedback and ratings
- **Event** - Analytics and event tracking

## Features in Detail

### Landing Page (/)
- Hero section with workshop overview
- Signup modal with email collection
- Feature highlights and statistics
- Responsive design

### Workshop Page (/workshop)
- Progress bar showing completion status
- Module list organized by sections
- "Start Learning" button (external or internal)
- Feedback form at bottom

### Module Pages (/modules/[slug])
- Individual module content
- Mark complete functionality
- Navigation between modules
- Progress tracking

### Admin Dashboard (/admin)
- Password-protected access
- User statistics and charts
- Feedback management
- CSV export functionality

## Customization

### Adding New Modules
Edit `data/modules.ts` to add new modules:

```typescript
{
  slug: 'new-module',
  title: 'New Module Title',
  summary: 'Module description',
  section: 'Section Name',
  order: 18
}
```

### Styling
The app uses TailwindCSS with custom CSS variables. Modify `app/globals.css` for global styles.

### Email Templates
Update `lib/mailer.ts` to customize email templates.

## Security Considerations

- JWT tokens are httpOnly and secure
- Rate limiting on signup endpoint
- Input validation with Zod schemas
- Environment variables for sensitive data
- CORS protection on API routes

## Performance

- Server-side rendering with Next.js
- Optimized images and fonts
- Minimal JavaScript bundle
- Efficient database queries with Prisma

## License

MIT License - feel free to use this project for your own workshops!


