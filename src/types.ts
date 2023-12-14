import { Faculty, Group, User, UserWithGroup } from "@prisma/client";

export type FullGroupType = Group & {
  _count: {
    userWithGroup: number;
  };
  faculty: Faculty;
};

export type FullUserType =
  | User
  | {
      _count: {
        userWithGroup: number;
      };
      userWithGroup: {
        group: {
          code: string;
        };
      }[];
    };
