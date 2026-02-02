import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Configuration</h1>
          <p className="text-gray-400 font-inter">System settings and preferences</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Save size={20} />
          Save Changes
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-orbitron font-bold text-white mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 font-inter mb-2">System Name</label>
              <input
                type="text"
                defaultValue="MBK2 Control Deck"
                className="w-full h-10 bg-dark-900/50 border border-cyan-500/20 rounded px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 font-inter mb-2">Version</label>
              <input
                type="text"
                defaultValue="v2.4.7"
                className="w-full h-10 bg-dark-900/50 border border-cyan-500/20 rounded px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-orbitron font-bold text-white mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Email Alerts', 'System Updates', 'Low Stock Warnings'].map((item, index) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={index < 2}
                  className="w-5 h-5 bg-dark-900/50 border border-cyan-500/30 rounded checked:bg-cyan-500 transition-all"
                />
                <span className="text-gray-300 font-inter group-hover:text-cyan-500 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
