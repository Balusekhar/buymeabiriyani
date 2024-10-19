import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get request body (e.g., custom amount)

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom Donation", // Custom product name for the donation
            },
            unit_amount: body.amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/?success=true`, // Success URL
      cancel_url: `${req.nextUrl.origin}/?canceled=true`, // Cancel URL
      metadata: {
        amount: body.amount,
        supporterName: body.supporter,
        creator: body.creator,
        message: body.message
      },
    });

    // Send session URL to client for redirection
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}