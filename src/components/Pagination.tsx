import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-6 gap-2">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-dark-800 border border-cyan-500/20 text-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/10 transition-all"
            >
                <ChevronLeft size={20} />
            </motion.button>

            <span className="font-orbitron font-medium text-gray-300 mx-4">
                Page <span className="text-cyan-500">{currentPage}</span> of {totalPages}
            </span>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-dark-800 border border-cyan-500/20 text-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/10 transition-all"
            >
                <ChevronRight size={20} />
            </motion.button>
        </div>
    );
}
