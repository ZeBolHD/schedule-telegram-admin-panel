import axios from "axios";

import { FullGroupType } from "@/types";

const getAllGroups = async () => {
  try {
    const { data } = await axios.get<FullGroupType[]>("/api/groups");
    return data;
  } catch (e) {
    return null;
  }
};

export default getAllGroups;
