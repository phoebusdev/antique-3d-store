# Stripe Integration Research: Digital Product Delivery with Future Physical Product Support

**Research Date**: October 2025
**Target Framework**: Next.js 13+ (App Router & Pages Router)
**Stripe API Version**: 2025-01-27.acacia

---

## Table of Contents

1. [Payment Intent Metadata Strategy](#1-payment-intent-metadata-strategy)
2. [Webhook Implementation](#2-webhook-implementation)
3. [Download Link Security](#3-download-link-security)
4. [Test Mode Best Practices](#4-test-mode-best-practices)
5. [Next.js API Routes](#5-nextjs-api-routes)
6. [Stripe Elements](#6-stripe-elements)
7. [Future Physical Product Architecture](#7-future-physical-product-architecture)

---

## 1. Payment Intent Metadata Strategy

### Overview

Stripe metadata allows you to attach up to 50 key-value pairs to objects (40 character key limit, 500 character value limit). Metadata is:
- **Not shown to customers**
- **Not factored into fraud prevention**
- **Included in webhook events**
- **Visible in Stripe Dashboard and reports**

### Core Metadata Structure for Digital/Physical Routing

```javascript
// Recommended metadata structure for flexible fulfillment
const paymentIntentMetadata = {
  // Product identification
  product_id: 'prod_3d_model_xyz',
  product_type: 'digital', // or 'physical' or 'mixed'

  // Fulfillment routing
  fulfillment_type: 'digital_download', // or 'physical_shipping', 'hybrid'
  fulfillment_status: 'pending', // track progress

  // Internal system references
  order_id: 'ORD-2025-1234',
  cart_id: 'cart_abc123',

  // Product-specific data
  download_sku: 'model_fantasy_sword',
  file_format: 'glb', // for 3D models

  // Optional: Complex data as JSON string (up to 500 chars)
  product_details: JSON.stringify({
    name: 'Fantasy Sword Model',
    category: '3d_model',
    license_type: 'commercial'
  })
};
```

### Creating Payment Intent with Metadata (Node.js)

```javascript
// /api/create-payment-intent/route.ts (App Router)
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, productId, productType } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        product_id: productId,
        product_type: productType, // 'digital' or 'physical'
        fulfillment_type: productType === 'digital' ? 'digital_download' : 'physical_shipping',
        fulfillment_status: 'pending',
        order_id: `ORD-${Date.now()}`,
        // Add any additional business logic identifiers
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Checkout Session with Metadata

```javascript
// Alternative: Using Checkout Sessions
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { productId, productType, priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
        // Product-level metadata
        price_data: {
          product_data: {
            metadata: {
              product_type: productType,
              download_sku: 'model_fantasy_sword',
            }
          }
        }
      }
    ],
    // Session-level metadata (attached to Payment Intent)
    payment_intent_data: {
      metadata: {
        product_id: productId,
        product_type: productType,
        fulfillment_type: productType === 'digital' ? 'digital_download' : 'physical_shipping',
        order_id: `ORD-${Date.now()}`,
      }
    },
    // Checkout Session-level metadata
    metadata: {
      cart_id: 'cart_abc123',
      customer_note: 'First purchase',
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

### Updating Fulfillment Status

```javascript
// After fulfillment processing
const updatedIntent = await stripe.paymentIntents.update(
  'pi_123456789',
  {
    metadata: {
      fulfillment_status: 'download_link_sent', // or 'shipping_label_created'
      download_token_issued: 'true',
      download_expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
  }
);
```

### Metadata Use Cases

1. **Product Association**: Link payments to your product catalog
2. **Order Fulfillment**: Track shipping/download status
3. **Internal References**: Connect to your database records
4. **Fraud Prevention**: Pass data to Stripe Radar for custom rules
5. **Reporting**: Filter and analyze payments by business metrics

**Security Warning**: Never store sensitive PII, card details, or credentials in metadata.

---

## 2. Webhook Implementation

### Overview

Webhooks enable Stripe to send real-time notifications about events (payments, disputes, etc.). The `checkout.session.completed` event is crucial for post-payment fulfillment.

### Key Concepts

- **Signature Verification**: Ensures webhooks came from Stripe
- **Idempotency**: Handle duplicate events safely (15-25% of webhooks may be retried)
- **Fast Response**: Acknowledge within 200ms to prevent timeouts
- **Async Processing**: Queue heavy operations, return 200 OK immediately

### Next.js Webhook Handler (App Router)

```typescript
// /app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text(); // Get raw body as text
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return 200 OK immediately
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Idempotent event handler
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // 1. Check if already processed (idempotency)
  const existingOrder = await db.order.findUnique({
    where: { stripeSessionId: session.id }
  });

  if (existingOrder?.processed) {
    console.log('Event already processed:', session.id);
    return; // Already handled
  }

  // 2. Retrieve full session with line items
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'payment_intent']
  });

  const paymentIntent = fullSession.payment_intent as Stripe.PaymentIntent;
  const metadata = paymentIntent.metadata;

  // 3. Route based on product type
  if (metadata.product_type === 'digital') {
    await fulfillDigitalOrder(fullSession, metadata);
  } else if (metadata.product_type === 'physical') {
    await fulfillPhysicalOrder(fullSession, metadata);
  }

  // 4. Mark as processed
  await db.order.update({
    where: { stripeSessionId: session.id },
    data: { processed: true, processedAt: new Date() }
  });
}

async function fulfillDigitalOrder(
  session: Stripe.Checkout.Session,
  metadata: Stripe.Metadata
) {
  // 1. Generate download token
  const downloadToken = generateSecureDownloadToken({
    productId: metadata.product_id,
    orderId: metadata.order_id,
    customerEmail: session.customer_details?.email,
  });

  // 2. Store order in database
  await db.order.create({
    data: {
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      productId: metadata.product_id,
      customerEmail: session.customer_details?.email,
      downloadToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }
  });

  // 3. Send email with download link
  await sendDownloadEmail({
    to: session.customer_details?.email,
    downloadUrl: `${process.env.NEXT_PUBLIC_URL}/download/${downloadToken}`,
    productName: metadata.product_details,
  });

  // 4. Update Stripe metadata
  await stripe.paymentIntents.update(session.payment_intent as string, {
    metadata: {
      ...metadata,
      fulfillment_status: 'download_link_sent',
      download_token_issued: 'true',
    }
  });
}

async function fulfillPhysicalOrder(
  session: Stripe.Checkout.Session,
  metadata: Stripe.Metadata
) {
  // Create shipping order
  await db.order.create({
    data: {
      stripeSessionId: session.id,
      productId: metadata.product_id,
      shippingAddress: session.shipping_details,
      status: 'pending_shipment',
    }
  });

  // Notify warehouse/fulfillment system
  await notifyWarehouse(session);
}
```

### Next.js Webhook Handler (Pages Router)

```typescript
// /pages/api/webhooks/stripe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// CRITICAL: Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get raw body as buffer
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature']!;

    // Verify signature
    const event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
      webhookSecret
    );

    // Handle event (same logic as App Router example)
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      // ... other events
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: `Webhook error: ${error.message}` });
  }
}
```

### Idempotency Best Practices

```typescript
// Database schema for idempotency
model StripeEvent {
  id            String   @id // Stripe event ID
  type          String
  processed     Boolean  @default(false)
  processedAt   DateTime?
  createdAt     DateTime @default(now())

  @@index([id, processed])
}

// Idempotent event processor
async function processEventIdempotently(event: Stripe.Event) {
  // 1. Check if event already exists
  const existingEvent = await db.stripeEvent.findUnique({
    where: { id: event.id }
  });

  if (existingEvent?.processed) {
    console.log('Event already processed:', event.id);
    return; // Skip duplicate
  }

  // 2. Create event record (or update if exists)
  await db.stripeEvent.upsert({
    where: { id: event.id },
    create: {
      id: event.id,
      type: event.type,
      processed: false,
    },
    update: {},
  });

  // 3. Process the event
  try {
    await handleEvent(event);

    // 4. Mark as processed
    await db.stripeEvent.update({
      where: { id: event.id },
      data: {
        processed: true,
        processedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Event processing failed:', error);
    // Don't mark as processed, will retry
    throw error;
  }
}
```

### Webhook Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger payment_intent.succeeded
```

---

## 3. Download Link Security

### JWT Token-Based Download Links

Secure download links should be:
- **Time-limited** (expire after X days/hours)
- **Single-use or limited-use** (track download count)
- **Signed/encrypted** (prevent tampering)
- **Not passed in URLs** (use headers when possible)

### JWT Implementation

```typescript
// lib/jwt-tokens.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // 256-bit secret (use crypto.randomBytes(32))
const JWT_EXPIRY = '7d'; // 7 days

interface DownloadTokenPayload {
  productId: string;
  orderId: string;
  customerEmail: string;
  sku: string;
}

export function generateDownloadToken(payload: DownloadTokenPayload): string {
  return jwt.sign(
    {
      ...payload,
      type: 'download',
      iat: Math.floor(Date.now() / 1000), // issued at
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
      issuer: 'antique-3d-store',
      subject: payload.customerEmail,
    }
  );
}

export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'antique-3d-store',
    }) as DownloadTokenPayload;

    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Download token expired');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('Invalid download token');
    }
    return null;
  }
}
```

### Download API Route

```typescript
// /app/api/download/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/jwt-tokens';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  // 1. Verify JWT token
  const payload = verifyDownloadToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired download link' },
      { status: 401 }
    );
  }

  // 2. Check download limit (optional)
  const downloadRecord = await db.download.findFirst({
    where: {
      orderId: payload.orderId,
      productId: payload.productId,
    }
  });

  if (downloadRecord && downloadRecord.downloadCount >= 5) {
    return NextResponse.json(
      { error: 'Download limit exceeded' },
      { status: 403 }
    );
  }

  // 3. Get file path from product SKU
  const filePath = path.join(
    process.env.DIGITAL_PRODUCTS_PATH!,
    `${payload.sku}.glb`
  );

  try {
    // 4. Check if file exists
    const fileStats = await stat(filePath);

    // 5. Increment download count
    await db.download.upsert({
      where: {
        orderId_productId: {
          orderId: payload.orderId,
          productId: payload.productId,
        }
      },
      create: {
        orderId: payload.orderId,
        productId: payload.productId,
        downloadCount: 1,
        lastDownloadAt: new Date(),
      },
      update: {
        downloadCount: { increment: 1 },
        lastDownloadAt: new Date(),
      }
    });

    // 6. Stream file (for large files)
    const fileStream = createReadStream(filePath);

    return new NextResponse(fileStream as any, {
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': fileStats.size.toString(),
        'Content-Disposition': `attachment; filename="${payload.sku}.glb"`,
        'Cache-Control': 'private, no-store',
      }
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }
}
```

### Alternative: Signed S3 URLs (Recommended for Production)

```typescript
// lib/s3-downloads.ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export async function generateSignedDownloadUrl(
  key: string,
  expiresIn: number = 3600 // 1 hour
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${key}"`,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn, // URL expires in 1 hour
  });

  return signedUrl;
}

// Usage in webhook handler
async function sendDownloadEmail(orderId: string, productSku: string, email: string) {
  // Generate short-lived S3 URL
  const downloadUrl = await generateSignedDownloadUrl(
    `products/${productSku}.glb`,
    3600 // 1 hour
  );

  await sendEmail({
    to: email,
    subject: 'Your 3D Model Download',
    html: `
      <p>Thank you for your purchase!</p>
      <p><a href="${downloadUrl}">Download your 3D model</a></p>
      <p>This link expires in 1 hour. For security, request a new link from your account.</p>
    `
  });
}
```

### Security Checklist

- [ ] Use JWT with strong secret (256-bit minimum)
- [ ] Set reasonable expiration (7 days for downloads)
- [ ] Validate tokens on every download request
- [ ] Track download counts to prevent abuse
- [ ] Use HTTPS only
- [ ] Don't expose file paths in URLs
- [ ] Consider S3 signed URLs for cloud storage
- [ ] Log all download attempts
- [ ] Implement rate limiting

---

## 4. Test Mode Best Practices

### API Key Management

```bash
# .env.local (NEVER commit this file)
# Test mode keys (for development)
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Live mode keys (for production)
# STRIPE_SECRET_KEY=sk_live_51...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Key Security Practices

1. **Never expose secret keys** in client-side code or public repos
2. **Use environment variables** via `.env.local` (excluded from git)
3. **Rotate keys regularly** and before going live
4. **Use restricted keys** for specific services (read-only, write-only)
5. **Set IP restrictions** on API keys in Stripe Dashboard
6. **Separate test/live keys** completely (different environments)

### Test Card Numbers (2025)

```javascript
// Stripe test cards
const TEST_CARDS = {
  // Success scenarios
  SUCCESS: '4242424242424242',
  SUCCESS_3D_SECURE: '4000002500003155',

  // Decline scenarios
  GENERIC_DECLINE: '4000000000000002',
  INSUFFICIENT_FUNDS: '4000000000009995',
  LOST_CARD: '4000000000009987',
  STOLEN_CARD: '4000000000009979',

  // Special scenarios
  REQUIRES_AUTH: '4000002760003184', // 3D Secure 2 auth required
  PROCESSING_ERROR: '4000000000000119',
};

// Any future expiry date (e.g., 12/34)
// Any 3-digit CVC
// Any 5-digit ZIP code
```

### Development Workflow

```typescript
// lib/stripe-config.ts
const isProduction = process.env.NODE_ENV === 'production';
const isLiveMode = process.env.STRIPE_MODE === 'live';

export const stripeConfig = {
  secretKey: isLiveMode
    ? process.env.STRIPE_LIVE_SECRET_KEY!
    : process.env.STRIPE_TEST_SECRET_KEY!,

  publishableKey: isLiveMode
    ? process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLISHABLE_KEY!
    : process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY!,

  webhookSecret: isLiveMode
    ? process.env.STRIPE_LIVE_WEBHOOK_SECRET!
    : process.env.STRIPE_TEST_WEBHOOK_SECRET!,
};

// Prevent accidental live charges in development
if (!isProduction && isLiveMode) {
  throw new Error('Cannot use live Stripe keys in development environment!');
}
```

### Testing Checklist

- [ ] Use test mode for all development
- [ ] Test with various card scenarios (success, decline, 3D Secure)
- [ ] Use Stripe CLI to forward webhooks locally
- [ ] Test idempotency by triggering duplicate events
- [ ] Verify metadata flows through entire system
- [ ] Test error handling (network failures, invalid tokens)
- [ ] Rotate test keys before deploying
- [ ] Switch to live keys only in production environment

### Stripe Sandbox (Advanced)

For team development, use Stripe Sandboxes to create isolated test environments:

```bash
# Each developer gets their own sandbox
# - Separate test data
# - No interference between team members
# - Safe for CI/CD pipelines
```

---

## 5. Next.js API Routes

### App Router Structure (Next.js 13+)

```
app/
├── api/
│   ├── stripe/
│   │   ├── create-payment-intent/
│   │   │   └── route.ts
│   │   ├── create-checkout-session/
│   │   │   └── route.ts
│   │   └── verify-session/
│   │       └── route.ts
│   ├── webhooks/
│   │   └── stripe/
│   │       └── route.ts
│   └── download/
│       └── [token]/
│           └── route.ts
```

### Create Payment Intent API Route

```typescript
// /app/api/stripe/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      productId,
      productType,
      productName,
      customerEmail
    } = await req.json();

    // Validation
    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Amount must be at least $0.50' },
        { status: 400 }
      );
    }

    // Create Payment Intent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: customerEmail,
      metadata: {
        product_id: productId,
        product_name: productName,
        product_type: productType,
        fulfillment_type: productType === 'digital'
          ? 'digital_download'
          : 'physical_shipping',
        fulfillment_status: 'pending',
        order_id: `ORD-${Date.now()}`,
        created_via: 'payment_intent_api',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Payment Intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
```

### Create Checkout Session API Route

```typescript
// /app/api/stripe/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      priceId,
      productId,
      productType,
      customerEmail,
      quantity = 1
    } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail,

      line_items: [
        {
          price: priceId, // Stripe Price ID (price_xxx)
          quantity,
        }
      ],

      // Metadata attached to Payment Intent
      payment_intent_data: {
        metadata: {
          product_id: productId,
          product_type: productType,
          fulfillment_type: productType === 'digital'
            ? 'digital_download'
            : 'physical_shipping',
          order_id: `ORD-${Date.now()}`,
        },
        receipt_email: customerEmail,
      },

      // Metadata on session itself
      metadata: {
        product_id: productId,
        customer_email: customerEmail,
      },

      // Redirect URLs
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,

      // Optional: Collect shipping for physical products
      ...(productType === 'physical' && {
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU'],
        },
      }),
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url, // Redirect user here
    });

  } catch (error) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

### Verify Session API Route (Success Page)

```typescript
// /app/api/stripe/verify-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session_id' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items']
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    return NextResponse.json({
      success: true,
      orderDetails: {
        orderId: paymentIntent.metadata.order_id,
        productType: paymentIntent.metadata.product_type,
        customerEmail: session.customer_details?.email,
        amount: session.amount_total / 100,
        currency: session.currency,
      }
    });

  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
```

### Pages Router Alternative

```typescript
// /pages/api/stripe/create-payment-intent.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, productId, productType } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        product_id: productId,
        product_type: productType,
        fulfillment_type: productType === 'digital'
          ? 'digital_download'
          : 'physical_shipping',
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Error Handling Best Practices

```typescript
// lib/stripe-errors.ts
import Stripe from 'stripe';

export function handleStripeError(error: unknown) {
  if (error instanceof Stripe.errors.StripeError) {
    switch (error.type) {
      case 'StripeCardError':
        return {
          message: 'Your card was declined.',
          userMessage: error.message,
          code: error.code,
        };

      case 'StripeRateLimitError':
        return {
          message: 'Too many requests. Please try again later.',
          userMessage: 'Service temporarily unavailable.',
        };

      case 'StripeInvalidRequestError':
        return {
          message: 'Invalid request parameters.',
          userMessage: 'Something went wrong. Please try again.',
        };

      case 'StripeAPIError':
        return {
          message: 'Stripe API error.',
          userMessage: 'Payment service unavailable. Please try again.',
        };

      case 'StripeConnectionError':
        return {
          message: 'Network error connecting to Stripe.',
          userMessage: 'Connection failed. Please check your internet.',
        };

      case 'StripeAuthenticationError':
        return {
          message: 'Stripe authentication failed.',
          userMessage: 'Service configuration error.',
        };

      default:
        return {
          message: error.message,
          userMessage: 'Payment failed. Please try again.',
        };
    }
  }

  return {
    message: 'Unknown error',
    userMessage: 'Something went wrong. Please try again.',
  };
}
```

---

## 6. Stripe Elements

### Installation

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Stripe Provider Setup

```typescript
// app/checkout/page.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent on page load
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 29.99,
        productId: 'prod_3d_sword',
        productType: 'digital',
        productName: 'Fantasy Sword 3D Model',
      }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
```

### Payment Element Component

```typescript
// components/CheckoutForm.tsx
'use client';

import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: 'if_required', // Don't redirect if 3D Secure not needed
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
      setProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      setSucceeded(true);
      setProcessing(false);
      // Redirect to success page
      window.location.href = `/success?payment_intent=${paymentIntent.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
          wallets: {
            applePay: 'auto',
            googlePay: 'auto',
          },
        }}
      />

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
                   hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors font-medium"
      >
        {processing ? 'Processing...' : succeeded ? 'Payment Successful!' : 'Pay Now'}
      </button>
    </form>
  );
}
```

### Custom Styling Options

```typescript
// Advanced appearance customization
const customAppearance = {
  theme: 'stripe' as const,

  variables: {
    // Colors
    colorPrimary: '#8B5CF6', // Purple
    colorBackground: '#1F2937', // Dark background
    colorText: '#F9FAFB',
    colorDanger: '#EF4444',
    colorTextSecondary: '#9CA3AF',

    // Typography
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSizeBase: '16px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',

    // Borders
    borderRadius: '12px',

    // Spacing
    spacingUnit: '4px',
    spacingGridRow: '20px',
    spacingGridColumn: '20px',
  },

  rules: {
    '.Input': {
      border: '1px solid #374151',
      boxShadow: 'none',
      padding: '12px',
    },
    '.Input:focus': {
      border: '1px solid #8B5CF6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
    },
    '.Label': {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    '.Tab': {
      border: '1px solid #374151',
      boxShadow: 'none',
    },
    '.Tab--selected': {
      border: '1px solid #8B5CF6',
      boxShadow: '0 0 0 1px #8B5CF6',
    },
  },
};
```

### Error Handling in Elements

```typescript
// Enhanced error handling
const [elementError, setElementError] = useState<string | null>(null);

<PaymentElement
  onChange={(event) => {
    if (event.error) {
      setElementError(event.error.message);
    } else {
      setElementError(null);
    }
  }}
  onReady={() => {
    console.log('Payment Element ready');
  }}
  onLoadError={(error) => {
    console.error('Payment Element failed to load:', error);
    setError('Payment form failed to load. Please refresh the page.');
  }}
/>
```

### Using Card Element (Alternative)

```typescript
// For custom card-only forms
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CardOnlyForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'Customer Name',
        email: 'customer@example.com',
      },
    });

    if (error) {
      console.error(error);
    } else {
      // Use paymentMethod.id to confirm payment
      console.log('PaymentMethod created:', paymentMethod.id);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
```

---

## 7. Future Physical Product Architecture

### Design Principles

The metadata architecture should support **both digital and physical products** without code changes by:

1. Using a `product_type` field to differentiate
2. Storing fulfillment requirements in metadata
3. Routing webhook events based on metadata values
4. Keeping fulfillment logic modular and extensible

### Flexible Metadata Schema

```typescript
// Type definitions for metadata
interface BaseProductMetadata {
  product_id: string;
  product_type: 'digital' | 'physical' | 'hybrid';
  order_id: string;
  fulfillment_status: FulfillmentStatus;
}

interface DigitalProductMetadata extends BaseProductMetadata {
  product_type: 'digital';
  fulfillment_type: 'digital_download';
  download_sku: string;
  file_format: string;
  license_type?: 'personal' | 'commercial';
}

interface PhysicalProductMetadata extends BaseProductMetadata {
  product_type: 'physical';
  fulfillment_type: 'physical_shipping';
  warehouse_location?: string;
  shipping_method?: 'standard' | 'express' | 'overnight';
  requires_signature?: 'true' | 'false';
}

interface HybridProductMetadata extends BaseProductMetadata {
  product_type: 'hybrid';
  fulfillment_type: 'digital_and_physical';
  digital_sku: string;
  physical_sku: string;
}

type ProductMetadata =
  | DigitalProductMetadata
  | PhysicalProductMetadata
  | HybridProductMetadata;

type FulfillmentStatus =
  | 'pending'
  | 'processing'
  | 'download_link_sent'
  | 'shipped'
  | 'delivered'
  | 'failed';
```

### Product Catalog Structure

```typescript
// Database schema
model Product {
  id            String   @id @default(cuid())
  name          String
  type          ProductType // DIGITAL | PHYSICAL | HYBRID
  price         Int      // in cents
  stripePriceId String   // Stripe Price ID

  // Digital product fields
  digitalSku    String?
  fileFormat    String?
  filePath      String?

  // Physical product fields
  physicalSku   String?
  weight        Float?   // in grams
  dimensions    Json?    // {length, width, height}

  // Fulfillment configuration
  fulfillmentConfig Json // Flexible JSON for routing logic
}

enum ProductType {
  DIGITAL
  PHYSICAL
  HYBRID
}
```

### Unified Checkout Creation

```typescript
// /app/api/stripe/create-checkout-session/route.ts
export async function POST(req: NextRequest) {
  const { productId } = await req.json();

  // Fetch product from database
  const product = await db.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Build metadata based on product type
  const metadata = buildProductMetadata(product);

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: [
      {
        price: product.stripePriceId,
        quantity: 1,
      }
    ],
    payment_intent_data: {
      metadata, // Unified metadata structure
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  };

  // Add shipping collection for physical/hybrid products
  if (product.type === 'PHYSICAL' || product.type === 'HYBRID') {
    sessionConfig.shipping_address_collection = {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
    };
    sessionConfig.shipping_options = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'usd' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ];
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  return NextResponse.json({ sessionId: session.id });
}

function buildProductMetadata(product: Product): Stripe.MetadataParam {
  const baseMetadata = {
    product_id: product.id,
    product_type: product.type.toLowerCase(),
    order_id: `ORD-${Date.now()}`,
    fulfillment_status: 'pending',
  };

  if (product.type === 'DIGITAL') {
    return {
      ...baseMetadata,
      fulfillment_type: 'digital_download',
      download_sku: product.digitalSku!,
      file_format: product.fileFormat!,
    };
  }

  if (product.type === 'PHYSICAL') {
    return {
      ...baseMetadata,
      fulfillment_type: 'physical_shipping',
      physical_sku: product.physicalSku!,
      warehouse_location: (product.fulfillmentConfig as any).warehouse || 'US-WEST',
    };
  }

  // Hybrid product
  return {
    ...baseMetadata,
    fulfillment_type: 'digital_and_physical',
    download_sku: product.digitalSku!,
    physical_sku: product.physicalSku!,
  };
}
```

### Unified Webhook Handler with Routing

```typescript
// /app/api/webhooks/stripe/route.ts
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['payment_intent', 'line_items', 'shipping_details']
  });

  const paymentIntent = fullSession.payment_intent as Stripe.PaymentIntent;
  const metadata = paymentIntent.metadata;

  // Route based on fulfillment_type (not product_type for flexibility)
  switch (metadata.fulfillment_type) {
    case 'digital_download':
      await fulfillDigitalOrder(fullSession, metadata);
      break;

    case 'physical_shipping':
      await fulfillPhysicalOrder(fullSession, metadata);
      break;

    case 'digital_and_physical':
      // Process both in parallel
      await Promise.all([
        fulfillDigitalOrder(fullSession, metadata),
        fulfillPhysicalOrder(fullSession, metadata),
      ]);
      break;

    default:
      console.error('Unknown fulfillment type:', metadata.fulfillment_type);
  }
}

async function fulfillDigitalOrder(
  session: Stripe.Checkout.Session,
  metadata: Stripe.Metadata
) {
  // Generate download token
  const downloadToken = generateDownloadToken({
    productId: metadata.product_id,
    orderId: metadata.order_id,
    customerEmail: session.customer_details?.email!,
    sku: metadata.download_sku,
  });

  // Save to database
  await db.digitalOrder.create({
    data: {
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      productId: metadata.product_id,
      downloadSku: metadata.download_sku,
      customerEmail: session.customer_details?.email,
      downloadToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }
  });

  // Send email
  await sendDownloadEmail({
    to: session.customer_details?.email!,
    downloadUrl: `${process.env.NEXT_PUBLIC_URL}/download/${downloadToken}`,
    orderDetails: {
      orderId: metadata.order_id,
      productName: metadata.product_details || 'Your Digital Product',
    }
  });
}

async function fulfillPhysicalOrder(
  session: Stripe.Checkout.Session,
  metadata: Stripe.Metadata
) {
  // Save shipping order
  await db.physicalOrder.create({
    data: {
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      productId: metadata.product_id,
      physicalSku: metadata.physical_sku,
      customerEmail: session.customer_details?.email,

      // Shipping details
      shippingName: session.shipping_details?.name,
      shippingAddress: session.shipping_details?.address,
      shippingPhone: session.customer_details?.phone,

      status: 'pending_fulfillment',
    }
  });

  // Notify warehouse/fulfillment service
  await notifyFulfillmentService({
    orderId: metadata.order_id,
    sku: metadata.physical_sku,
    shippingAddress: session.shipping_details?.address,
    shippingMethod: metadata.shipping_method || 'standard',
  });

  // Send confirmation email
  await sendShippingConfirmationEmail({
    to: session.customer_details?.email!,
    orderDetails: {
      orderId: metadata.order_id,
      estimatedDelivery: '5-7 business days',
    }
  });
}
```

### Extensible Fulfillment Service

```typescript
// lib/fulfillment-router.ts
interface FulfillmentStrategy {
  canHandle(metadata: Stripe.Metadata): boolean;
  fulfill(session: Stripe.Checkout.Session, metadata: Stripe.Metadata): Promise<void>;
}

class DigitalFulfillmentStrategy implements FulfillmentStrategy {
  canHandle(metadata: Stripe.Metadata): boolean {
    return metadata.fulfillment_type === 'digital_download';
  }

  async fulfill(session: Stripe.Checkout.Session, metadata: Stripe.Metadata) {
    // Digital fulfillment logic
  }
}

class PhysicalFulfillmentStrategy implements FulfillmentStrategy {
  canHandle(metadata: Stripe.Metadata): boolean {
    return metadata.fulfillment_type === 'physical_shipping';
  }

  async fulfill(session: Stripe.Checkout.Session, metadata: Stripe.Metadata) {
    // Physical fulfillment logic
  }
}

class SubscriptionFulfillmentStrategy implements FulfillmentStrategy {
  canHandle(metadata: Stripe.Metadata): boolean {
    return metadata.fulfillment_type === 'subscription_access';
  }

  async fulfill(session: Stripe.Checkout.Session, metadata: Stripe.Metadata) {
    // Grant subscription access
  }
}

// Fulfillment router
class FulfillmentRouter {
  private strategies: FulfillmentStrategy[] = [
    new DigitalFulfillmentStrategy(),
    new PhysicalFulfillmentStrategy(),
    new SubscriptionFulfillmentStrategy(),
    // Add new strategies without changing existing code
  ];

  async route(session: Stripe.Checkout.Session, metadata: Stripe.Metadata) {
    const strategy = this.strategies.find(s => s.canHandle(metadata));

    if (!strategy) {
      throw new Error(`No fulfillment strategy for type: ${metadata.fulfillment_type}`);
    }

    await strategy.fulfill(session, metadata);
  }
}

// Usage in webhook
const fulfillmentRouter = new FulfillmentRouter();
await fulfillmentRouter.route(session, metadata);
```

### Future-Proof Metadata Fields

```typescript
// Reserved metadata fields for future expansion
const FUTURE_PROOF_METADATA = {
  // Core routing
  fulfillment_type: 'digital_download', // REQUIRED: Routes to correct handler
  product_type: 'digital',             // OPTIONAL: Business classification

  // Extensibility
  fulfillment_config: JSON.stringify({ // JSON for complex configs
    digital: {
      format: 'glb',
      downloadLimit: 5,
      expiryDays: 30,
    },
    physical: {
      warehouse: 'US-WEST',
      requiresSignature: false,
    }
  }),

  // Future product types
  delivery_method: 'email', // or 'api', 'webhook', 'manual'
  license_key_required: 'true',
  subscription_tier: 'pro',

  // Analytics & tracking
  utm_source: 'newsletter',
  referral_code: 'FRIEND20',
  affiliate_id: 'aff_123',
};
```

### Migration Path

When adding physical products later:

1. **No webhook changes required** - routing is metadata-driven
2. **Add new product records** with `type: 'PHYSICAL'`
3. **Implement physical fulfillment strategy** (modular)
4. **Update UI** to show shipping forms
5. **Test with Stripe test mode** before going live

---

## Summary & Quick Reference

### Key Takeaways

1. **Metadata is King**: Use `fulfillment_type` to route orders without code changes
2. **Idempotency is Critical**: Always check for duplicate webhook events
3. **Security First**: JWT tokens for downloads, never expose secrets
4. **Test Thoroughly**: Use Stripe test mode and CLI extensively
5. **Design for Growth**: Build routing logic that scales to new product types

### Essential Stripe Objects

```typescript
// Payment Intent: Core payment object
const paymentIntent = {
  id: 'pi_xxx',
  amount: 2999, // $29.99 in cents
  currency: 'usd',
  metadata: { /* your data */ },
  client_secret: 'pi_xxx_secret_yyy', // Send to frontend
};

// Checkout Session: Hosted payment page
const checkoutSession = {
  id: 'cs_xxx',
  payment_intent: 'pi_xxx',
  metadata: { /* session-level data */ },
  url: 'https://checkout.stripe.com/...', // Redirect here
};

// Webhook Event: Notification from Stripe
const webhookEvent = {
  id: 'evt_xxx',
  type: 'checkout.session.completed',
  data: {
    object: { /* Checkout Session or Payment Intent */ }
  }
};
```

### Environment Variables Checklist

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_xxx              # Test mode secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # Test mode publishable
STRIPE_WEBHOOK_SECRET=whsec_xxx            # Webhook signing secret

# Application URLs
NEXT_PUBLIC_URL=http://localhost:3000      # Frontend URL

# Security
JWT_SECRET=<256-bit-random-string>         # For download tokens

# Storage (for digital products)
DIGITAL_PRODUCTS_PATH=/path/to/files       # Local file storage
# OR
AWS_REGION=us-east-1                       # S3 for production
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET_NAME=my-digital-products
```

### Recommended Next Steps

1. Set up Stripe account in test mode
2. Create test products with metadata
3. Implement `/api/stripe/create-payment-intent` route
4. Implement `/api/webhooks/stripe` with signature verification
5. Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
6. Build checkout UI with Stripe Elements
7. Implement JWT-based download system
8. Add idempotency checks to webhook handlers
9. Test all scenarios (success, decline, 3D Secure)
10. Rotate keys and deploy to production

---

**Resources**:
- [Stripe API Docs](https://docs.stripe.com/api)
- [Stripe Metadata Guide](https://docs.stripe.com/metadata)
- [Next.js + Stripe Guide](https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
