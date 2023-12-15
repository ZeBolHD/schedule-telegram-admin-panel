import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

import prisma from "@/libs/prismadb";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const groupId = req.nextUrl.searchParams.get("groupId");

  if (!groupId) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    await prisma.group.delete({
      where: {
        id: Number(groupId),
      },
    });

    return new Response("Group deleted", { status: 200 });
  } catch (e) {
    return new Response("Group not found", { status: 404 });
  }
}
