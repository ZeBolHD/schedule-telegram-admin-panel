interface TableItemProps {
  children: number | string | React.ReactNode;
}

const TableCellItem = ({ children }: TableItemProps) => {
  return <td className="border p-3">{children}</td>;
};

export default TableCellItem;
