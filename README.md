# Laundry Management System - Marketing Website

Modern, responsive marketing website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Optimized for performance with Next.js
- **SEO Friendly**: Built-in SEO optimization
- **Type Safe**: Full TypeScript support
- **Tested**: Unit tests with Jest and React Testing Library

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3004](http://localhost:3004) in your browser.

## 🏗️ Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Project Structure

```
frontend-marketing/
├── public/              # Static files
├── src/
│   ├── app/            # Next.js 14 App Router
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   └── ...
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   │   └── ...
│   ├── lib/           # Utility functions
│   └── styles/        # Global styles
├── .env.example       # Environment variables template
├── next.config.js     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Dependencies
```

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Check deployment readiness:**
   ```bash
   node check-deployment-ready.js
   ```

2. **Push to Git:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.example.com/api` |

### Next.js Config

Edit `next.config.js` for:
- Image domains
- Redirects
- Headers
- Rewrites

### Tailwind Config

Edit `tailwind.config.ts` for:
- Custom colors
- Fonts
- Breakpoints
- Plugins

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3004 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 🔗 Related Repositories

- **Backend API**: [laundry-backend](../backend)
- **Admin Panel**: [laundry-admin](../frontend)
- **SuperAdmin Panel**: [laundry-superadmin](../frontend-superadmin)

## 📄 License

Private - All rights reserved

## 🤝 Contributing

This is a private project. Contact the team for contribution guidelines.

## 📞 Support

For support, email support@yourlaundry.com or contact the development team.

---

Built with ❤️ by Your Team
