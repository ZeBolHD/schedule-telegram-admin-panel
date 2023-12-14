interface TableRowItemProps {
  children: React.ReactNode;
}

const TableRowItem = ({ children }: TableRowItemProps) => {
  return <tr>{children}</tr>;
};

export default TableRowItem;
