"use server";
import { auth } from "@/auth";
import prisma from "@/lib/dbConnect";
import { redirect } from "next/navigation";

export const saveWelcomeDetails = async (formData: FormData) => {
  const session = await auth();

  console.log(formData);
  if (session?.user) {
    const newCreator = await prisma.creator.create({
      data: {
        username: formData.get("username") as string,
        bio: (formData.get("bio") as string) || "",
        email: session.user.email as string,
      },
    });
    console.log("Creator Details Saved to DB", newCreator);
    redirect("/");
  }
};
