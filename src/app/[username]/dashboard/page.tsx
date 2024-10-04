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
import { Creator } from "@/types/dashboard"; // Import the Creator type

function CreatorDashboard({ params }: { params: { username: string } }) {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [creatorData, setCreatorData] = useState<Creator | null>(null);
  console.log(creatorData);

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

  const totalDonations = creatorData.donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  const supporterCount = creatorData.supporters.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            BuyMeABiriyani
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href={`/${creatorData.username}`}
              className="text-gray-600 hover:text-orange-500 flex items-center"
            >
              <ExternalLink className="h-5 w-5 mr-1" />
              Visit Your Page
            </Link>
            <form action={handleSignOut}>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-orange-500"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="https://fastly.picsum.photos/id/112/4200/2800.jpg?hmac=8Qhr0ehkFOnlKO__aKhLMQTu2qzcAten9LHpBO6uk-k"
          alt="Cover Photo"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          // objectFit="cover"
          priority
        />
        <label
          htmlFor="cover-photo-input"
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <Camera className="h-6 w-6 text-gray-600" />
          <input
            id="cover-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      {/* Profile Photo, Username, and Bio */}
      <div className="container mx-auto px-4 mb-6 py-4">
        <div className="flex flex-col items-center -mt-20">
          <div className="relative">
            <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt={creatorData.username}
              />
              <AvatarFallback>
                {creatorData.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-photo-input"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <Camera className="h-5 w-5 text-gray-600" />
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          {/* Username and Bio */}
          <div className="text-center mt-3 space-y-2">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {creatorData.username}
              </h1>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600">
                {creatorData.bio ||
                  "A passionate creator serving up delicious content! 🍛"}
              </p>
            </div>

            <div className="flex justify-center space-x-8 text-gray-600 mt-2">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">{supporterCount} supporters</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">
                  ₹{totalDonations.toFixed(2)} received
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Top 10% creator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                id="custom-amount"
                placeholder="Enter amount"
                type="number"
                min="1"
                step="1"
                className="w-full"
                onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
              />
            </div>
            <Textarea
              placeholder="Leave a message (optional)"
              className="mb-4"
            />
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300">
              Support with ₹{selectedAmount || ""}{" "}
              {selectedAmount ? "Biriyani" : ""}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Supporters</h2>
            <div className="space-y-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreatorDashboard;
