import { TelegramUser } from "@prisma/client";
import axios from "axios";

const getAllUsers = async () => {
  try {
    const { data } = await axios.get<TelegramUser[]>("/api/users");
    return data;
  } catch (e) {
    return null;
  }
};

export default getAllUsers;
