import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`⚠️  Webhook signature verification failed.`, errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntent = event.data.object as Stripe.Checkout.Session;
      const metadata = paymentIntent.metadata;
      const paymentStatus = paymentIntent.status;
      const paymentId = paymentIntent.id;
      if (metadata) {
        const { creator, supporterName, amount, message } = metadata;
        console.log(creator, supporterName, amount, message);
        // Save the metadata to your database
        const newSupporter = await prisma.supporter.create({
          data: {
            name: supporterName,
          },
        });
        const findCreator = await prisma.creator.findUnique({
          where: {
            username: creator,
          },
        });
        const newDonation = await prisma.donation.create({
          data: {
            amount: parseFloat(amount),
            message: message,
            supporterId: newSupporter.id,
            creatorId: findCreator?.id || "",
            paymentStatus: paymentStatus,
            stripeSessionId: paymentId,
          },
        });
        console.log("Donation Saved to DB", newDonation);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
