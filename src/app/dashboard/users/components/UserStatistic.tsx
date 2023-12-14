import Statistic, { StatisticItem } from "@/components/Statistic";
import { FullTelegramUserType } from "@/types";

interface UserStatisticProps {
  users: FullTelegramUserType[];
}

const UserStatistic = ({ users }: UserStatisticProps) => {
  const statistic: StatisticItem[] = [
    {
      label: "Users",
      data: users?.length || 0,
    },
  ];

  return <Statistic statisticList={statistic} />;
};

export default UserStatistic;
