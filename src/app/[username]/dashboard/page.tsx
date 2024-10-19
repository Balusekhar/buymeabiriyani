"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Camera,
  DollarSign,
  Users,
  TrendingUp,
  LogOut,
  ExternalLink,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { handleSignOut } from "@/actions/logoutAction";
import { useState, useEffect } from "react";
import { Creator } from "@/types/dashboard";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CreatorDashboard({ params }: { params: { username: string } }) {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [supporterName, setSupporterName] = useState("");
  const [message, setMessage] = useState("");
  const [creatorData, setCreatorData] = useState<Creator | null>(null);
  console.log(creatorData);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const response = await fetch(`/api/creator/1`);
        const data = await response.json();
        setCreatorData(data);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    fetchCreatorData();
  }, []);

  if (!creatorData) {
    return <div>Loading...</div>;
  }

  // const totalDonations = creatorData.donations.reduce(
  //   (sum, donation) => sum + donation.amount,
  //   0
  // );

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator: creatorData.username,
          supporter: supporterName,
          amount: selectedAmount,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      // Redirect to Stripe Checkout (this will happen on the server-side, no CORS issue)
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Error creating session:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Recent and New Donations */}
      <div className="grid px-4 py-2 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Buy Me A Biriyani</h2>
            <p className="text-gray-600 mb-6">
              Support {creatorData.username} with a delicious virtual biriyani!
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[5, 10, 15].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-300
                ${
                  selectedAmount === amount
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                >
                  <span className="text-4xl mb-2">
                    {amount === 5 ? "🙂" : amount === 10 ? "😊" : "😍"}
                  </span>
                  <span className="font-bold text-gray-700">₹{amount}</span>
                  <span className="text-sm text-gray-500">
                    {amount === 5
                      ? "Small"
                      : amount === 10
                      ? "Regular"
                      : "Large"}{" "}
                    Biriyani
                  </span>
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label
                htmlFor="custom-amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Custom Amount
              </label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                min="1"
                step="1"
                className="w-full"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="supporter-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your name
              </label>
              <Input
                id="supporter-name"
                placeholder="Eg: John Doe"
                type="text"
                className="w-full"
                value={supporterName}
                onChange={(e: any) => setSupporterName(e.target.value)}
              />
            </div>
            <Textarea
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              placeholder="Leave a message (optional)"
              className="mb-4"
            />
            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300"
            >
              Support with ₹{selectedAmount || ""}{" "}
              {selectedAmount ? "Biriyani" : ""}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Supporters</h2>
            {/* <div className="space-y-4">
              {creatorData.donations.map((donation, index) => {
                // Find the supporter details based on supporterId
                const supporter = creatorData.supporters.find(
                  (s) => s.id === donation.supporterId
                );

                const supporterName = supporter?.name || "Anonymous"; // Get the name or fallback to 'Anonymous'

                return (
                  <div
                    key={donation.id}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow transition-all duration-300 hover:shadow-md"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {supporterName[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800">
                          {supporterName}
                        </h3>
                        <p className="text-sm font-medium text-orange-600 flex items-center">
                          <Heart className="h-4 w-4 mr-1 fill-current" /> ₹
                          {donation.amount}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {donation.message || "No message"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreatorDashboard;
