import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, suffix }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded flex items-center justify-center">
            <Icon className="text-cyan-500" size={24} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-inter ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <h3 className="text-gray-400 text-sm font-inter mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-orbitron font-bold text-white">{value}</span>
          {suffix && <span className="text-gray-500 text-sm font-inter">{suffix}</span>}
        </div>

        <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent" />
      </div>

      <motion.div
        className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
