import { FullGroupType } from "@/types";
import axios from "axios";

const getAllGroups = async () => {
  try {
    const { data } = await axios.get<FullGroupType[]>("/api/groups");
    return data;
  } catch (e) {
    return null;
  }
};

export default getAllGroups;
