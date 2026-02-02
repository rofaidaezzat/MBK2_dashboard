import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'System Status',
  '/admin/products': 'Inventory Grid',
  '/admin/orders': 'Transmission Logs',
  '/admin/users': 'Access Control',
  '/admin/settings': 'Configuration',
};

export default function TopBar() {
  const location = useLocation();
  const currentPage = breadcrumbMap[location.pathname] || 'Dashboard';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-dark-800/30 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-inter">
          <span className="text-gray-500">Signal Status</span>
          <span className="text-gray-600">/</span>
          <span className="text-cyan-500 font-medium">{currentPage}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search protocols..."
            className="w-64 h-10 bg-dark-900/50 border border-cyan-500/20 rounded pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 bg-dark-900/50 border border-cyan-500/20 rounded flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </motion.button>

        <div className="w-px h-6 bg-cyan-500/20" />

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 bg-dark-900/50 border border-cyan-500/20 rounded px-3 py-2 cursor-pointer hover:border-cyan-500/50 transition-all"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="text-sm">
            <div className="text-white font-inter font-medium">Admin</div>
            <div className="text-xs text-gray-500">Core Access</div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
