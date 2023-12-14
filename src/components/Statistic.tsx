export type StatisticItem = {
  label: string;
  data: number;
};

interface StatisticProps {
  statisticList: StatisticItem[];
}

const Statistic = ({ statisticList }: StatisticProps) => {
  return (
    <section className="w-full">
      <ul className=" text-black text-xl grid gap-10 auto-cols-min grid-flow-col">
        {statisticList.map((statistic) => (
          <li
            key={statistic.label}
            className="w-60 px-4 py-5 flex items-center bg-white rounded-md"
          >
            <div className="w-full flex justify-between">
              <p>{statistic.label}</p>
              <p>{statistic.data}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Statistic;
