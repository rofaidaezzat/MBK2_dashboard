import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  LogOut
} from 'lucide-react';
import SidebarLogo from '../assets/595708428_122095426011158679_243980012230250174_n.jpg';
import { useLogoutMutation } from '../app/Serves/cruduser';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Box, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/admin/messages', icon: MessageCircle, label: 'Messages' },
 
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await logout({}).unwrap();
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        localStorage.removeItem('token');
        navigate('/login');
    }
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-dark-800/50 backdrop-blur-md border-r border-cyan-500/20 relative flex flex-col"
    >
      <div className="p-6 flex-1">
        <motion.div
          className="flex items-center justify-center mb-8"
        >
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img 
                src={SidebarLogo} 
                alt="Control Deck" 
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/20 shadow-lg shadow-cyan-500/20"
              />
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

       <div className="p-6 border-t border-cyan-500/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          {!isCollapsed && (
            <span className="font-inter text-sm font-medium">Logout</span>
          )}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-dark-800 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-500 hover:bg-cyan-500/20 transition-all z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      
    </motion.aside>
  );
}
