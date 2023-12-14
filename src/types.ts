import { Faculty, Group, TelegramUser } from "@prisma/client";

export type FullGroupType = Group & {
  _count: {
    userWithGroup: number;
  };
  faculty: Faculty;
};

export type FullTelegramUserType = TelegramUser & {
  _count: {
    userWithGroup: number;
  };
  userWithGroup: {
    group: {
      code: string;
    };
  }[];
};
