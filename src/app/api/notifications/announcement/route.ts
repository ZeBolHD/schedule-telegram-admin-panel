import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

import prisma from "@/libs/prismadb";
import { TELEGRAM_SENDMESSAGE_URL } from "@/consts";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const { heading, content } = body;

  if (!heading || !content) {
    return new Response("Invalid data", { status: 400 });
  }

  const users = await prisma.userWithSubscription.findMany({
    where: {
      subscriptionId: 2,
    },
    select: {
      userId: true,
    },
  });

  const chatIds = users.map((user) => user.userId);

  for (const chatId of chatIds) {
    await axios.post(TELEGRAM_SENDMESSAGE_URL, {
      chat_id: chatId,
      text: `*${heading}*` + "\n\n" + content,
      parse_mode: "Markdown",
    });
  }

  return new Response("Success", { status: 200 });
}
