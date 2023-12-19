import axios from "axios";

import { Announcement } from "@/types";

const sendAnnouncement = async ({ heading, content }: Announcement) => {
  try {
    axios.post("/api/notifications/announcement", {
      heading,
      content,
    });
  } catch (e) {
    return null;
  }
};

export default sendAnnouncement;
