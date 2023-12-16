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
  const notification = query.get("notification");

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

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
