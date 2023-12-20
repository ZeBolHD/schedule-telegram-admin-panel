import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

import {
  TELEGRAM_SENDMEDIAGROUP_URL,
  TELEGRAM_SENDMESSAGE_URL,
  TELEGRAM_SENDPHOTO_URL,
} from "@/consts";

export async function POST(req: NextRequest) {
  const reqFormData = await req.formData();

  const formData = new FormData();

  formData.append("chat_id", "721618175");

  const heading = reqFormData.get("heading") as string;
  const content = reqFormData.get("content") as string;
  const images = reqFormData.getAll("image") as Blob[];

  const text = `*${heading}*` + "\n\n" + content;
  formData.append("text", text);
  formData.append("parse_mode", "Markdown");

  // const media: any = [];

  // for (let image of images) {
  //   media.push({
  //     type: "photo",
  //     media: streamSa,
  // }
  // // console.log(media);

  // formData.append("media", JSON.stringify(media));

  axios.post(TELEGRAM_SENDMESSAGE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // console.log(reqFormData);
  // console.log(formData);

  return NextResponse.json({ status: "Test" }, { status: 200 });
}
