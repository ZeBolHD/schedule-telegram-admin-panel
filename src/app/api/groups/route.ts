import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groups = await prisma.group.findMany({
    include: {
      userWithGroup: {
        select: {
          userId: true,
        },
      },
      faculty: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(groups);
}
