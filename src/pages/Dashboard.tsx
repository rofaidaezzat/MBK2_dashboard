import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';

const stats = [
  {
    title: 'Total Revenue',
    value: '$284,592',
    icon: DollarSign,
    trend: { value: 12.5, isPositive: true },
  },
  {
    title: 'Active Orders',
    value: '847',
    icon: ShoppingCart,
    trend: { value: 8.2, isPositive: true },
  },
  {
    title: 'Inventory Health',
    value: '94',
    icon: Package,
    suffix: '%',
    trend: { value: 2.1, isPositive: false },
  },
  {
    title: 'Site Traffic',
    value: '12.4K',
    icon: Activity,
    trend: { value: 15.7, isPositive: true },
  },
];

const networkData = [
  { time: '00:00', value: 4200 },
  { time: '04:00', value: 3800 },
  { time: '08:00', value: 6800 },
  { time: '12:00', value: 9200 },
  { time: '16:00', value: 11400 },
  { time: '20:00', value: 8600 },
  { time: '24:00', value: 7200 },
];

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">System Status</h1>
          <p className="text-gray-400 font-inter">Real-time operations monitoring</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          Sync Data
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-orbitron font-bold text-white mb-1">Network Traffic</h2>
            <p className="text-gray-400 text-sm font-inter">Sales activity over the last 24 hours</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full" />
              <span className="text-sm text-gray-400 font-inter">Revenue Stream</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={networkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              style={{ fontSize: '12px', fontFamily: 'Inter' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px', fontFamily: 'Inter' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
                fontFamily: 'Inter',
              }}
              labelStyle={{ color: '#00d9ff' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: '#00d9ff', r: 4 }}
              activeDot={{ r: 6, fill: '#00d9ff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-orbitron font-bold text-white mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { type: 'success', message: 'Inventory sync completed successfully', time: '2m ago' },
              { type: 'warning', message: 'Low stock alert: Router X-200', time: '15m ago' },
              { type: 'info', message: 'System backup initiated', time: '1h ago' },
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-dark-900/50 border border-cyan-500/10 rounded"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  alert.type === 'success' ? 'bg-green-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                } animate-pulse`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-300 font-inter">{alert.message}</p>
                  <span className="text-xs text-gray-500 font-inter">{alert.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-orbitron font-bold text-white mb-4">System Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Server Load', value: 67, color: 'cyan' },
              { label: 'Database Query Time', value: 45, color: 'blue' },
              { label: 'API Response Rate', value: 92, color: 'green' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 font-inter">{metric.label}</span>
                  <span className="text-sm text-cyan-500 font-orbitron font-semibold">{metric.value}%</span>
                </div>
                <div className="h-2 bg-dark-900/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${
                      metric.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
                      metric.color === 'blue' ? 'from-blue-500 to-blue-400' :
                      'from-green-500 to-green-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
