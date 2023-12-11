import { Group } from "@prisma/client";

interface StatisticProps {
  groups: Group[];
}

const Statistic = ({}: StatisticProps) => {
  return <div>Statistic</div>;
};

export default Statistic;
