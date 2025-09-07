# 🚀 Deployment Guide

## Quick Start
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

## Environment Variables Needed
- `DATABASE_URL` - Your PostgreSQL connection string
- `APP_SECRET` - JWT secret (32+ characters)
- `RESEND_API_KEY` - Email service API key
- `ADMIN_PASSWORD` - Admin access password
- `NEXT_PUBLIC_BASE_URL` - Your production URL
- `WORKSHOP_EXTERNAL_URL` - Workshop page URL

## Admin Access
- URL: `/admin`
- Password: Set in environment variables

## Security Features
- Rate limiting on all API routes
- Password hashing with bcrypt
- Input validation and sanitization
- Security headers
- XSS and SQL injection protection

## Support
Contact: nextkeyfoundation@gmail.com
