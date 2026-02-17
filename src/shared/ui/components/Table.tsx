import { TableProps } from '@/interfaces';
import Link from 'next/link';
import DataTableBody from './DataTableBody';

const Table = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  showEdit,
  showActionsColumn = true,
  deleteLocation,
  otherClassName,
}: TableProps) => {
  return (
    <div className={`bg-white rounded-2xl border border-(--bg-slate-100) p-4 w-full ${otherClassName}`}>
      <div className="flex items-center justify-between gap-3 mb-2 px-6 py-4">
        <h1 className="text-black font-bold text-lg">{title}</h1>
        <Link href="#" className="text-(--bg-bold-blue)">
          عرض الكل
        </Link>
      </div>
      <DataTableBody
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        showEdit={showEdit}
        showActionsColumn={showActionsColumn}
        deleteLocation={deleteLocation}
      />
    </div>
  );
};

export default Table;
