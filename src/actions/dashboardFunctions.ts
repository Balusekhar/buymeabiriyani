import { auth } from "@/auth";
import prisma from "@/lib/dbConnect";

export const getCreatorDetails = async () => {
  const session = await auth();

  if (session?.user) {
    const username = session.user.username;
    const creator = await prisma.creator.findFirst({
      where: {
        username: username,
      },
    });

    if (creator) {
      console.log(typeof creator);
      console.log(creator);
      return creator;
    }
  }
};
