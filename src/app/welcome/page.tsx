"use client";
import React, { useState, ChangeEvent } from "react";
import { auth } from "@/auth";
// import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, FileText, Image as ImageIcon, Camera, X } from "lucide-react";
import { redirect } from "next/navigation";
import { saveWelcomeDetails } from "@/actions/saveWelcomeDetails";

function WelcomeScreen() {
  const [uploadedProfilePhoto, setUploadedProfileImage] = useState<File | null>(
    null
  );
  const [uploadedCoverPhoto, setUploadedCoverPhoto] = useState<File | null>(
    null
  );

  // const { data: session, status } = useSession();

  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/");
  // }

  // Handle Profile Photo Upload
  function handleProfileUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedProfileImage(files[0]);
    }
  }

  // Handle Cover Photo Upload
  function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedCoverPhoto(files[0]);
    }
  }

  // Clear Profile Photo Input
  function clearProfilePhoto() {
    console.log("button clicked");
    setUploadedProfileImage(null);
    const input = document.getElementById("profilePhoto") as HTMLInputElement;
    if (input) input.value = "";
  }

  // Clear Cover Photo Input
  function clearCoverPhoto() {
    setUploadedCoverPhoto(null);
    const input = document.getElementById("coverPhoto") as HTMLInputElement;
    if (input) input.value = "";
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto container bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to BuyMeABiriyani!
              </h1>
              <p className="text-gray-600">
                Let's set up your profile to get started.
              </p>
            </div>
            <form action={saveWelcomeDetails} className="px-8 space-y-6" encType="multipart/form-data">
              {/* Username Input */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
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

              {/* Bio Input */}
              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
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

              {/* Profile Photo Upload */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="profilePhoto"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Camera className="w-5 h-5 mr-2 text-orange-500" />
                  Upload Profile Photo
                </label>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleProfileUpload}
                />
                {uploadedProfilePhoto && (
                  <button
                    type="button"
                    className="absolute left-[100%] top-[25px] p-1 text-gray-600 hover:text-red-600"
                    onClick={clearProfilePhoto}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Cover Photo Upload */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="coverPhoto"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
                  Upload Cover Photo
                </label>
                <Input
                  id="coverPhoto"
                  name="coverPhoto"
                  type="file"
                  accept="image/*"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleCoverUpload}
                />
                {uploadedCoverPhoto && (
                  <button
                    type="button"
                    className="absolute left-[100%] top-[25px] p-1 text-gray-600 hover:text-red-600"
                    onClick={clearCoverPhoto}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-500 italic">
                Note: Maximum file size for photos is 4.5MB.
              </p>

              {/* Submit Button */}
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
