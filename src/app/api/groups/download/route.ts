import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { TELEGRAM_DOWNLOAD_URL, TELEGRAM_GETFILE_URL } from "@/consts";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fileId = req.nextUrl.searchParams.get("file_id");

  if (!fileId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const response = await fetch(TELEGRAM_GETFILE_URL + fileId);

  if (!response.ok) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const fileResponse = await response.json();
  const filePath = fileResponse.result.file_path;

  const file = await fetch(TELEGRAM_DOWNLOAD_URL + filePath);

  if (!file.ok) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filePath}"`,
    },
  });
}
