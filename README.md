# Antique 3D Store

Museum-quality 3D models of historical antique furniture. E-commerce platform with Next.js 14, React Three Fiber, and Stripe integration.

![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Stripe](https://img.shields.io/badge/Stripe-14.25.0-purple)

## Features

- **🎨 3D Gallery**: Interactive gallery with auto-rotating 3D previews using React Three Fiber
- **🔍 Search & Filter**: Search by name, era, or provenance with real-time filtering
- **💳 Secure Checkout**: Stripe integration with Payment Intents API
- **📥 Digital Downloads**: JWT-secured downloads with 24-hour expiry and download limits
- **🎯 Responsive Design**: Mobile-first design with Tailwind CSS
- **♿ Accessibility**: WCAG 2.1 AA compliant

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **3D Rendering**: React Three Fiber + Drei
- **Payment**: Stripe
- **Validation**: Zod
- **Authentication**: JWT (jsonwebtoken)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/phoebusdev/antique-3d-store.git
   cd antique-3d-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:
   ```env
   # Stripe Keys (get from https://dashboard.stripe.com/apikeys)
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # JWT Secret (generate: openssl rand -base64 32)
   JWT_SECRET=your-secure-random-secret-here

   # Admin Password
   ADMIN_PASSWORD=your-admin-password

   # App URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phoebusdev/antique-3d-store)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**

   Go to your Vercel project settings and add:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `JWT_SECRET`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_BASE_URL`

4. **Set up Stripe Webhook**

   In your [Stripe Dashboard](https://dashboard.stripe.com/webhooks):
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
antique-3d-store/
├── app/
│   ├── _components/       # React components
│   ├── _lib/              # Utility functions
│   ├── api/               # API routes
│   │   ├── stripe/        # Payment Intent creation
│   │   ├── webhooks/      # Stripe webhook handler
│   │   └── download/      # Secure file downloads
│   ├── checkout/          # Checkout pages
│   ├── model/             # Model detail pages
│   ├── success/           # Post-purchase page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home/Gallery page
├── types/                 # TypeScript type definitions
├── public/
│   ├── models/            # .glb 3D model files
│   └── images/            # Thumbnail images
└── specs/                 # Project specifications
```

## Adding New Models

Edit `app/_lib/models.ts` and add to the `MODELS` array:

```typescript
{
  id: 'model-slug',
  name: 'Model Name',
  era: '1920s Art Deco',
  provenance: 'Historical details...',
  dimensions: '30" H x 20" W x 15" D',
  vertices: 120000,
  fileSize: 2500000,
  fileUrl: '/models/model-slug.glb',
  price: 3500, // in cents ($35.00)
  published: true,
  thumbnailUrl: '/images/model-slug.jpg',
}
```

Then add the corresponding files:
- `public/models/model-slug.glb`
- `public/images/model-slug.jpg`

## Testing Payments

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date and any CVC

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/phoebusdev/antique-3d-store/issues
- Email: support@antique3d.com

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
