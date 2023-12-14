interface TableProps {
  labels: string[];
  children: React.ReactNode;
}

const Table = ({ labels, children }: TableProps) => {
  return (
    <section className="w-full mt-10 ">
      <table className="w-full justify-between border-collapse rounded">
        <thead>
          <tr className="text-lg border">
            {labels.map((label) => (
              <th key={label} className="border">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-right">{children}</tbody>
      </table>
    </section>
  );
};

export default Table;
