import { Group } from "@prisma/client";
import axios from "axios";

const sendFile = async (groupId: number, notification: number, file: File) => {
  const formData = new FormData();
  formData.append("document", file, file.name);

  const url = `/api/schedule?groupId=${groupId}&notification=${notification}`;

  const { data } = await axios.post<Group>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export default sendFile;
