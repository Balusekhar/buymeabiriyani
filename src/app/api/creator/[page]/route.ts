import { auth } from "@/auth";
import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { page: string } }) {
  const page = parseInt(params.page);
  const session = await auth();
  const creatorDashboardDetails = await prisma.creator.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      supporters: {
        take: 10,
        skip: (page - 1) * 10,
        orderBy: { createdAt: "desc" },
      },
      donations: {
        take: 10,
        skip: (page - 1) * 10,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return NextResponse.json(creatorDashboardDetails);
}

//Get creator details like username and bio
//Get the total amount a creator has received
//Get the total number of supporters a creator has
//Get the recent donations for a creator
