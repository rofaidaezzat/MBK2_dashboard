import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataGridProps {
  columns: Column[];
  data: Record<string, ReactNode>[];
  onRowClick?: (row: Record<string, ReactNode>) => void;
}

export default function DataGrid({ columns, data, onRowClick }: DataGridProps) {
  return (
    <div className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark-900/50 border-b border-cyan-500/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-6 py-4 text-left text-xs font-orbitron font-semibold text-cyan-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {data.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-cyan-500/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm font-inter text-gray-300">
                    {row[column.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="py-12 text-center text-gray-500 font-inter">
          No data available
        </div>
      )}
    </div>
  );
}
