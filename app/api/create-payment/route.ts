import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Note: Stripe SDK doesn't fully support Edge Runtime yet
// Using Stripe API directly via fetch for Edge compatibility

interface PaymentRequest {
  amount: number;
  clientName: string;
  clientEmail: string;
  companyName: string;
  services: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequest = await req.json();
    const { amount, clientName, clientEmail, companyName, services } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Create Stripe Payment Link using Fetch API (Edge-compatible)
    const response = await fetch('https://api.stripe.com/v1/payment_links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': `BLURRD STUDIO Services - ${companyName}`,
        'line_items[0][price_data][product_data][description]': services.join(', '),
        'line_items[0][price_data][unit_amount]': (amount * 100).toString(),
        'line_items[0][quantity]': '1',
        'after_completion[type]': 'hosted_confirmation',
        'after_completion[hosted_confirmation][custom_message]': `Thank you ${clientName}! Your payment has been received. We'll be in touch within 24 hours to schedule your project kickoff.`,
        'metadata[client_name]': clientName,
        'metadata[client_email]': clientEmail,
        'metadata[company_name]': companyName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Stripe API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const paymentLink = await response.json();

    return NextResponse.json({
      success: true,
      paymentUrl: paymentLink.url,
      paymentLinkId: paymentLink.id,
    });
  } catch (error) {
    console.error('Payment link creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
