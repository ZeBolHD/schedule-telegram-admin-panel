import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

//@ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.telegramUser.findMany({
    include: {
      userWithGroup: {
        include: {
          group: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}
