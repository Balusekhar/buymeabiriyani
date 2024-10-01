import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/dbConnect";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // Sessions expire after 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  callbacks: {
    async session({ session }) {
      const creator = await prisma.creator.findFirst({
        where: {
          email: session.user.email,
        },
      });

      if (creator) {
        session.user.id = creator.id;
        session.user.email = creator.email;
        session.user.username = creator.username;
      }
      return session;
    },
  },
});
