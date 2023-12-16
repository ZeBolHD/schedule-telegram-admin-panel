import axios from "axios";

import { GroupCreateType, FullGroupType } from "@/types";

const createGroup = async (data: GroupCreateType) => {
  try {
    const { data: group } = await axios.post<FullGroupType>(
      "/api/groups/add",
      data
    );
    return group;
  } catch (e) {
    return null;
  }
};

export default createGroup;
