import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/libs/prismadb";

import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.telegramUser.findMany({
    include: {
      userWithGroup: {
        select: {
          group: {
            select: {
              code: true,
            },
          },
        },
      },
      _count: {
        select: {
          userWithGroup: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(users);
}
