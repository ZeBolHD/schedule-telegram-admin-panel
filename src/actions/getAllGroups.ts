import { FullGroupType } from "@/types";

const getAllGroups = async () => {
  const groups = (await fetch("/api/groups").then((res) =>
    res.json()
  )) as FullGroupType[];
  return groups;
};

export default getAllGroups;
