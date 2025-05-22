// components/admin/DataTable.tsx
'use client'
import React from 'react';

interface DataTableProps<T> {
  columns: {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

export function DataTable<T extends { id?: number }>({
    columns,
    data,
    onEdit,
    onDelete,
    isAdmin = false,
  }: DataTableProps<T>) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {isAdmin && (onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-750">
                {columns.map((column) => (
                  <td key={`${item.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </td>
                ))}
                {isAdmin && (onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-indigo-400 hover:text-indigo-300 mr-3"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && item.id && (
                      <button
                        onClick={() => onDelete(item.id!)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }