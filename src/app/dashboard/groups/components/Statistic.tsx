import { Group } from "@prisma/client";

interface StatisticProps {
  groups: Group[];
}

const Statistic = ({ groups }: StatisticProps) => {
  const groupsLength = groups.length;

  return (
    <section className="w-full">
      <ul className=" text-black text-xl grid gap-10 auto-cols-min grid-flow-col">
        <li className="h-32 w-60 p-5 flex items-center bg-white rounded-md">
          <div className="w-full flex justify-between">
            <p>Groups</p>
            <p>{groupsLength}</p>
          </div>
        </li>
        <li className="h-32 w-60 p-5 flex items-center bg-white rounded-md">
          <div className="w-full flex justify-between">
            <p>Groups</p>
            <p>{groupsLength}</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Statistic;
