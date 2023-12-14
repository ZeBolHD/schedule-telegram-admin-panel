import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { TELEGRAM_DOWNLOAD_URL, TELEGRAM_GETFILE_URL } from "@/consts";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fileId = req.nextUrl.searchParams.get("file_id");

  if (!fileId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(TELEGRAM_GETFILE_URL + fileId);
    const filePath = data.result.file_path;

    const { data: file } = await axios.get(TELEGRAM_DOWNLOAD_URL + filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filePath}"`,
      },
    });
  } catch (e: AxiosError | any) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
