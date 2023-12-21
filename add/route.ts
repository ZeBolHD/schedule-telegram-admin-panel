import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/libs/prismadb";

import { authOptions } from "../src/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { code } = body;
  const { facultyId } = body;
  const { studyType } = body;
  const { grade } = body;

  if (!code || !facultyId || !studyType || !grade) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const group = await prisma.group.create({
      data: {
        code,
        facultyId: Number(facultyId),
        studyType: Number(studyType),
        grade: Number(grade),
      },
    });

    return NextResponse.json({ group });
  } catch (error) {
    return NextResponse.json(
      { error: "Group already exists" },
      { status: 409 }
    );
  }
}
