import prisma from "@/lib/dbConnect";

export const checkCreatorInDb = async (email: string) => {
  const existingCreator = await prisma.creator.findFirst({
    where: {
      email: email,
    },
  });
  if (!existingCreator) {
    return false;
  }
  return true;
};
