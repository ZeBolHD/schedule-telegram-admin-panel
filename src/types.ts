import { Faculty, Group, UserWithGroup } from "@prisma/client";

export type FullGroupType = Group & {
  userWithGroup: UserWithGroup[];
  faculty: Faculty;
};
