"use server";
import { auth, signOut } from "@/auth";
export const handleSignOut = async () => {
  const session = await auth();
  console.log(session);
  if (session?.user) {
    await signOut({ redirectTo: "/" });
  }
};
