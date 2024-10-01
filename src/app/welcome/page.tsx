"use client";
import React from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { saveWelcomeDetails } from "@/actions/saveWelcomeDetails";

async function WelcomeScreen() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8"> {/* Centering the main content */}
        <div className="max-w-2xl mx-auto container bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to BuyMeABiriyani!</h1>
              <p className="text-gray-600">Let's set up your profile to get started.</p>
            </div>
            <form action={saveWelcomeDetails} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-500" />
                  Choose your username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="spicychef123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium text-gray-700 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-500" />
                  Tell us about yourself
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="I'm a food enthusiast sharing my culinary adventures..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Create My Profile
              </Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        © 2024 BuyMeABiriyani. All rights reserved.
      </footer>
    </div>
  );
}

export default WelcomeScreen;