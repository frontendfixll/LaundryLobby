# Frontend Marketing - Vercel Deployment Guide

## Prerequisites

1. GitHub/GitLab account with the repository
2. Vercel account (free tier works)
3. Backend API deployed and accessible

## Step-by-Step Deployment

### 1. Push to Git Repository

```bash
# Navigate to frontend-marketing folder
cd frontend-marketing

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Marketing website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/laundry-marketing.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Environment Variables** - Add these:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

6. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from frontend-marketing folder)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? laundry-marketing
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### 3. Configure Environment Variables

After deployment, add environment variables in Vercel Dashboard:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-api.com/api`
   - **Environment**: Production, Preview, Development

4. Click **Save**
5. Redeploy: **Deployments** → Latest → **⋯** → **Redeploy**

### 4. Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `www.yourlaundry.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

## Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["bom1"]
}
```

### .env.production
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## Important Notes

### 1. API URL Configuration

Replace `https://your-backend-api.com/api` with your actual backend URL:

- **Render**: `https://your-app.onrender.com/api`
- **Railway**: `https://your-app.railway.app/api`
- **Heroku**: `https://your-app.herokuapp.com/api`
- **Custom**: `https://api.yourlaundry.com/api`

### 2. CORS Configuration

Make sure your backend allows requests from Vercel domain:

```javascript
// backend/src/app.js
const allowedOrigins = [
  'http://localhost:3004',
  'https://your-vercel-app.vercel.app',
  'https://www.yourlaundry.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 3. Image Domains

If using external images, update `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: [
      'localhost',
      'your-backend-api.com',
      'res.cloudinary.com'  // If using Cloudinary
    ],
  },
}
```

### 4. Build Optimization

For faster builds, add to `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Solution**: Run `npm install` locally and commit `package-lock.json`

**Error**: `Environment variable not found`
- **Solution**: Add all `NEXT_PUBLIC_*` variables in Vercel dashboard

### API Connection Issues

**Error**: `Network Error` or `CORS Error`
- **Solution**: Check backend CORS configuration
- **Solution**: Verify `NEXT_PUBLIC_API_URL` is correct

### 404 on Routes

**Error**: Page not found on refresh
- **Solution**: Vercel handles this automatically for Next.js
- **Solution**: Check if pages are in correct folder structure

### Slow Performance

- Enable **Edge Functions** in Vercel settings
- Use **Image Optimization** with Next.js `<Image>` component
- Enable **Incremental Static Regeneration (ISR)**

## Monitoring & Analytics

### 1. Vercel Analytics

Enable in Vercel Dashboard:
- Go to **Analytics** tab
- Click **Enable Analytics**
- Free tier: 100k events/month

### 2. Performance Monitoring

Check in Vercel Dashboard:
- **Speed Insights**: Page load times
- **Web Vitals**: Core Web Vitals scores
- **Real User Monitoring**: Actual user experience

## Automatic Deployments

Vercel automatically deploys on:
- **Push to main branch**: Production deployment
- **Push to other branches**: Preview deployment
- **Pull requests**: Preview deployment with unique URL

## Rollback

If deployment has issues:
1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **⋯** → **Promote to Production**

## Cost

**Free Tier Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Custom domains
- Preview deployments

**Pro Tier ($20/month):**
- 1 TB bandwidth
- Advanced analytics
- Password protection
- Team collaboration

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Community**: https://github.com/vercel/next.js/discussions

## Checklist

Before deploying, ensure:

- [ ] Code pushed to Git repository
- [ ] `package.json` has correct scripts
- [ ] `.env.production` configured
- [ ] Backend API is deployed and accessible
- [ ] Backend CORS allows Vercel domain
- [ ] All dependencies in `package.json`
- [ ] No hardcoded localhost URLs in code
- [ ] Images use Next.js `<Image>` component
- [ ] API calls use `NEXT_PUBLIC_API_URL` env variable

## Post-Deployment

After successful deployment:

1. **Test all pages** on production URL
2. **Test API connections** (forms, data fetching)
3. **Check mobile responsiveness**
4. **Test performance** with Lighthouse
5. **Set up monitoring** and alerts
6. **Configure custom domain** (if applicable)
7. **Update DNS records** for custom domain
8. **Test SSL certificate** (should be automatic)

## Example Production URLs

After deployment, you'll get:
- **Vercel URL**: `https://laundry-marketing.vercel.app`
- **Custom Domain**: `https://www.yourlaundry.com` (if configured)
- **Preview URLs**: `https://laundry-marketing-git-feature-branch.vercel.app`

## Quick Deploy Command

```bash
# One-line deploy to production
cd frontend-marketing && vercel --prod
```

---

**Need Help?** Check Vercel's excellent documentation or reach out to their support team!
