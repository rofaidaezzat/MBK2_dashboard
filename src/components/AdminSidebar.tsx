import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'System Status' },
  { path: '/admin/products', icon: Box, label: 'Inventory Grid' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Transmission Logs' },
  { path: '/admin/users', icon: Users, label: 'Access Control' },
  { path: '/admin/settings', icon: Settings, label: 'Configuration' },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-dark-800/50 backdrop-blur-md border-r border-cyan-500/20 relative"
    >
      <div className="p-6">
        <motion.div
          className="flex items-center gap-3 mb-8"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-orbitron font-bold">M2</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-xl font-orbitron font-bold text-white">CONTROL DECK</h1>
              <p className="text-xs text-cyan-500">v2.4.7</p>
            </motion.div>
          )}
        </motion.div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-500'
                      : 'text-gray-400 hover:text-cyan-500 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="font-inter text-sm">{item.label}</span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-cyan-500 rounded-full animate-pulse"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-dark-800 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-500 hover:bg-cyan-500/20 transition-all"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="absolute bottom-6 left-0 right-0 px-6">
        <div className={`bg-dark-900/50 border border-cyan-500/20 rounded p-3 ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-inter">System Online</span>
          </div>
          <div className="text-xs text-gray-500 font-mono">Uptime: 99.97%</div>
        </div>
      </div>
    </motion.aside>
  );
}
