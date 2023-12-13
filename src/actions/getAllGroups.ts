import { FullGroupType } from "@/types";

const getAllGroups = async () => {
  const groups = fetch("/api/groups").then((res) => res.json()) as Promise<
    FullGroupType[]
  >;
  return groups;
};

export default getAllGroups;
