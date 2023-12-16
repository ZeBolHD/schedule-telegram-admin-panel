import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { TELEGRAM_SENDDOCUMENT_URL, TELEGRAM_UPLOAD_CHATID } from "@/consts";
import prisma from "@/libs/prismadb";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = req.nextUrl.searchParams;

  const formData = await req.formData();
  const groupId = query.get("groupId");
  let notification = Boolean(Number(query.get("notification")));

  if (!groupId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const { data } = await axios.post(
      TELEGRAM_SENDDOCUMENT_URL + "?chat_id=" + TELEGRAM_UPLOAD_CHATID,
      formData
    );

    const file_id = data.result.document.file_id;

    const group = await prisma.group.update({
      where: {
        id: Number(groupId),
      },
      data: {
        fileId: file_id,
      },
    });

    if (notification) {
      const users = await prisma.userWithGroup.findMany({
        where: {
          groupId: Number(groupId),
        },

        select: {
          userId: true,
        },
      });

      const groupChatIds = users.map((user) => user.userId);

      const usersWithGroupSubscription =
        await prisma.userWithSubscription.findMany({
          where: {
            userId: {
              in: groupChatIds,
            },
            subscriptionId: 1,
          },
          select: {
            userId: true,
          },
        });

      const usersWithGroupSubscriptionIds = usersWithGroupSubscription.map(
        (user) => user.userId
      );

      const chatIds = groupChatIds.filter((chatId) =>
        usersWithGroupSubscriptionIds.includes(chatId)
      );

      if (chatIds.length > 0) {
        const text = "New schedule has been added!";

        for (let chatId of chatIds) {
          const url = TELEGRAM_SENDDOCUMENT_URL;
          await axios.post(url, {
            chat_id: chatId,
            document: file_id,
            caption: text,
          });
        }
      }
    }

    return NextResponse.json({ group });
  } catch (e) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
