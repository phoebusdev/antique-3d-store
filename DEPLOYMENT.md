# Deployment Guide

## Important: 3D Model Files

The actual .glb model files (68MB total) are **NOT** included in the git repository because they exceed GitHub's file size limits. You have two options:

### Option 1: Use Vercel Blob Storage (Recommended for Production)

1. Install Vercel Blob:
   ```bash
   npm install @vercel/blob
   ```

2. Upload your GLB files to Vercel Blob Storage:
   ```bash
   vercel blob upload public/models/*.glb
   ```

3. Update `app/_lib/models.ts` to use the blob URLs instead of `/models/` paths

### Option 2: Deploy GLB Files Separately (Quick Start)

The GLB files are currently in `public/models/` locally. For deployment:

1. **Store files in Vercel's public directory during build**:
   - Add a build step to copy models from a secure location
   - Or upload directly to Vercel's CDN

2. **Use external CDN** (recommended for production):
   - Upload to AWS S3, Cloudflare R2, or similar
   - Update URLs in `app/_lib/models.ts`

## Current Model Files

These files need to be available at runtime:

```
public/models/
├── Madonna_and_Child_wit_1027185650_generate.glb (15MB)
├── Religious_Marble_Reli_1027183744_generate.glb (18MB)
├── Statue_of_Grace_1027181656_generate.glb (16MB)
├── Statue_of_a_Medieval__1027180930_generate.glb (9.7MB)
└── Warrior_s_Majesty_1027191655_generate.glb (12MB)
```

## Deploying to Vercel

### Prerequisites

1. Vercel account
2. GitHub repository connected
3. Environment variables configured
4. GLB files stored (see options above)

### Environment Variables

Set these in your Vercel project settings:

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your-secure-random-secret
ADMIN_PASSWORD=your-admin-password
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### Deployment Steps

1. **Connect GitHub repo to Vercel**
   ```bash
   vercel link
   ```

2. **Set environment variables**
   ```bash
   vercel env add STRIPE_SECRET_KEY production
   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
   # ... add all env vars
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set up Stripe Webhook**
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret and update `STRIPE_WEBHOOK_SECRET`

## Testing the Deployment

1. Visit your deployed site
2. Check that models load in the gallery
3. Test checkout with Stripe test card: `4242 4242 4242 4242`
4. Verify webhook receives payment events

## Troubleshooting

### Models Not Loading

**Problem**: 3D models show as broken or missing

**Solutions**:
- Ensure GLB files are accessible at the URLs in `models.ts`
- Check browser console for 404 errors
- Verify file paths match exactly

### Build Fails

**Problem**: Build fails during `npm run build`

**Solutions**:
- Check all environment variables are set (except during build)
- Verify no import-time environment checks (should be lazy-loaded)
- Review build logs for specific errors

### Checkout Errors

**Problem**: Stripe checkout fails

**Solutions**:
- Verify `STRIPE_SECRET_KEY` is correct
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` matches your account
- Ensure webhook secret is from the correct endpoint

## Performance Optimization

For production, consider:

1. **CDN for GLB files**: Serve from Cloudflare/AWS CloudFront
2. **Image optimization**: Add proper thumbnail images (currently placeholders)
3. **Caching**: Configure Vercel edge caching for static assets
4. **Compression**: GLB files are already compressed, but verify transfer encoding

## Security Checklist

- [ ] JWT_SECRET is cryptographically random (32+ chars)
- [ ] ADMIN_PASSWORD is strong and unique
- [ ] Stripe keys are for the correct environment (test vs live)
- [ ] Webhook secret matches Stripe dashboard
- [ ] .env.local is in .gitignore (never commit secrets)
