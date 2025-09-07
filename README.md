# 🏠 NextKey Housing Access Foundation - Workshop Platform

A comprehensive educational platform designed to help NYC residents navigate housing programs and access resources.

## 🌟 Features

### 🎯 Learning Tracks
- **Tenant & Voucher Holder Track**: Rights, vouchers, applications, stability
- **Landlord & Property Manager Track**: Business benefits, compliance, relationships
- **Housing Secrets Track**: Insider knowledge, hidden programs, networking
- **Advocate & Community Track**: Advocacy skills, community organizing, policy
- **Real Estate Professional Track**: Professional certification, compliance

### 🔐 Security & Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on all API routes
- Input validation and sanitization
- XSS and SQL injection protection

### 📊 Admin Dashboard
- Real-time analytics and statistics
- User management and CSV export
- Feedback monitoring
- Monthly signup tracking

### 🌍 Internationalization
- English and Spanish support
- Dynamic language switching
- Localized content and UI

### 📱 Mobile Responsive
- Optimized for all device sizes
- Touch-friendly interface
- Fast loading performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Vercel account for deployment

### Installation
```bash
# Clone repository
git clone <repository-url>
cd brittany-workshop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL="your-postgresql-connection-string"
APP_SECRET="your-jwt-secret-key"
RESEND_API_KEY="your-resend-api-key"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
WORKSHOP_EXTERNAL_URL="http://localhost:3000/workshop"
```

## 📋 Admin Access

- **URL**: `/admin`
- **Password**: `admin123`
- **Features**: Analytics, user management, feedback monitoring

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logos in `public/` directory
- Customize content in `lib/i18n.ts`

### Content
- Add new learning tracks in `app/page.tsx`
- Create course modules in `app/workshop/page.tsx`
- Update translations in `lib/i18n.ts`

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies
- **Email**: Resend
- **Deployment**: Vercel

## 📈 Analytics

The platform includes comprehensive analytics:
- User signups and engagement
- Course completion tracking
- Feedback collection and analysis
- Monthly growth metrics

## 🛡️ Security Features

- Rate limiting (100 req/min general, 5 req/min login)
- Password strength validation
- Input sanitization
- Security headers (HSTS, CSP, X-Frame-Options)
- Bot detection and blocking
- SQL injection prevention

## 🌐 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Manual Deployment
See `DEPLOYMENT.md` for detailed instructions.

## 📞 Support

For technical support or customization requests:
- Email: nextkeyfoundation@gmail.com
- GitHub Issues: [Repository Issues]

## 📄 License

© 2025 NextKey Housing Access Foundation. All rights reserved.

---

**Built with ❤️ for NYC Housing Community**