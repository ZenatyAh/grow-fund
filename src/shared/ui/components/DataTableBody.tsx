/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Search, Hash } from 'lucide-react';
import { DataTableBodyProps } from '@/interfaces';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { StatusBadge } from '@/components/campaign-balances/StatusBadge';

const DataTableBody = ({
  columns,
  data,
  onEdit,
  onDelete,
  searchTerm,
  showEdit,
  showActionsColumn = true,
  // onRowPatched,
}: DataTableBodyProps) => {
  const filteredColumns = columns?.filter((col) => {
    if (col === 'shipping_method') {
      return !data.some((row) =>
        ['account_id', 'multi_id', 'access'].includes((row as any)[col])
      );
    }
    return true;
  });

  // === visibleColumns ===
  // The columns that will actually appear in the table after excluding internal and irrelevant columns
  const visibleColumns = filteredColumns?.reduce<any[]>((acc, col) => {
    if (col.key === 'updated_at' || col.key === 'user_id' || col.key === 'slug') return acc;

    return [...acc, col];
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center bg-white whitespace-nowrap relative rounded-2xl overflow-hidden">
        <thead className="bg-(--bg-blue-gray)">
          <tr className="truncate whitespace-nowrap overflow-hidden text-(--text-slate-400) font-bold text-base">
            {visibleColumns?.map((col) => (
              <th
                key={col.key}
                className="text-base font-bold p-3 text-center align-middle"
              >
                {col.label}
              </th>
            ))}
            {showActionsColumn && (onEdit || onDelete) && (
              <th className="text-base font-bold p-3 text-center align-middle">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data && data.length > 0 ? (
            data.map((row, idx) => {
              return (
                <tr
                  key={row.id}
                  className={idx !== data.length - 1 ? 'border-b-2 border-(--bg-slate-200)' : ''}
                >
                  {visibleColumns?.map((col) => {
                    const columnKey = String(col.key);
                    const rawValue = (row as any)[columnKey];

                    if (columnKey === 'status') {
                      return (
                        <td
                          key={columnKey}
                          className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                        >
                          <StatusBadge value={String(rawValue)} badgeStatus={String(row[columnKey])} otherClassName='text-base!' showValueIcon />
                        </td>
                      );
                    }

                    if (columnKey === 'donor') {
                      return (
                        <td
                          key={columnKey}
                          className="py-4 truncate whitespace-nowrap flex items-center justify-center gap-2"
                        >
                          <Image
                            src={
                              // `${API_URL}${rawValue}` ||
                              '/images/logo.png'
                            }
                            alt={columnKey}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          {String(rawValue)}
                        </td>
                      );
                    }

                    if (
                      (columnKey === 'image' || columnKey === 'photo') &&
                      typeof rawValue === 'string'
                    ) {
                      return (
                        <td key={columnKey}>
                          <Image
                            src={
                              // `${API_URL}${rawValue}` ||
                              `/assets/products/${rawValue}.jpg` ||
                              '/assets/no-image-available.webp'
                            }
                            alt={columnKey}
                            width={100}
                            height={100}
                            className="w-20 h-20 object-cover rounded-md border border-gray-200"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = 'none';
                            }}
                          />
                        </td>
                      );
                    }

                    const cellValue =
                      rawValue === null ||
                        rawValue === undefined ||
                        rawValue === ''
                        ? 'unavailable'
                        : Array.isArray(rawValue)
                          ? rawValue.join(', ') // لو القيمة مصفوفة، نجمعها كنص
                          : String(rawValue);

                    return (
                      <td
                        key={columnKey}
                        className="px-6 py-4 max-w-xs truncate whitespace-nowrap overflow-hidden"
                        title={String(cellValue)}
                      >
                        {col === 'icon' && cellValue ? (
                          <div className="flex justify-center">
                            <Image
                              // src={
                              //   `${API_URL}${cellValue}` ||
                              //   '/assets/no-image-available.webp'
                              // }
                              src="/assets/no-image-available.webp"
                              alt={String(col)}
                              width={80}
                              height={80}
                              className="w-16 h-16 object-contain"
                              onError={(e) => {
                                (
                                  e.currentTarget as HTMLImageElement
                                ).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : cellValue != null ? (
                          col === 'user' ? (
                            String((cellValue as any).name ?? 'unavailable')
                          ) : (
                            String(cellValue)
                          )
                        ) : (
                          'unavailable'
                        )}
                      </td>
                    );
                  })}

                  {showActionsColumn && (onEdit || onDelete) && (
                    <td className="px-2 space-x-1 whitespace-nowrap">
                      {onEdit && (
                        <Button
                          onClick={() => onEdit(row.id)}
                          className="px-4! text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      {/* {onDelete && (
                        <ResponsiveDialogDrawer
                          trigger={
                            <Button
                              handleClick={() =>
                                setOpenDeleteId(String(row.id))
                              }
                              otherClassName="!px-4 text-gray-400 bg-transparent hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                          open={openDeleteId === String(row.id)}
                          setOpen={(val) =>
                            setOpenDeleteId(val ? String(row.id) : null)
                          }
                          isMobile={isMobile}
                        >
                          <DeleteWarningContent
                            deleteLocation={deleteLocation}
                            item={row?.name || row?.title || `#${row.id}`}
                            onCancel={() => setOpenDeleteId(null)}
                            onDelete={() => {
                              onDelete(row.id);
                              setOpenDeleteId(null);
                            }}
                          />
                        </ResponsiveDialogDrawer>
                      )} */}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={visibleColumns?.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-12 text-center text-gray-500"
              >
                {searchTerm ? (
                  <div>
                    <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items found matching {searchTerm}</p>
                  </div>
                ) : (
                  <div>
                    <Hash className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p>No items available</p>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableBody;
