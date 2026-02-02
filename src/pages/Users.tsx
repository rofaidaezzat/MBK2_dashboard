import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export default function Users() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Access Control</h1>
          <p className="text-gray-400 font-inter">User management and permissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <UserPlus size={20} />
          Add User
        </motion.button>
      </div>

      <div className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-12 text-center">
        <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="text-cyan-500" size={32} />
        </div>
        <h3 className="text-xl font-orbitron font-bold text-white mb-2">Coming Soon</h3>
        <p className="text-gray-400 font-inter">User management interface under construction</p>
      </div>
    </motion.div>
  );
}
