import { Faculty, Group, UserWithGroup } from "@prisma/client";

export type FullGroupType = Group & {
  _count: {
    userWithGroup: number;
  };
  faculty: Faculty;
};
