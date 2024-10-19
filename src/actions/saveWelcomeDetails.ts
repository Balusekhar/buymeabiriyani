"use server";
import { auth } from "@/auth";
import prisma from "@/lib/dbConnect";
import { redirect } from "next/navigation";

export const saveWelcomeDetails = async (formData: FormData) => {
  const session = await auth();

  // Extract the profile and cover photos from formData
  const profilePhoto = formData.get("profilePhoto") as File;
  const coverPhoto = formData.get("coverPhoto") as File;

  // Validation: Ensure at least one of the photos is uploaded and is a valid file
  if (!profilePhoto && !(coverPhoto instanceof File)) {
    return {
      error: "Please select a profile photo or cover photo",
    };
  }

  console.log(formData);

  if (session?.user) {
    // Create new creator in the database
    const newCreator = await prisma.creator.create({
      data: {
        username: formData.get("username") as string,
        email: session.user.email || "",
        bio: (formData.get("bio") as string) || "",
      },
    });
    console.log("Creator Details Saved to DB", newCreator);

    // Redirect to the homepage after successful profile creation
    redirect("/");
  }
};
