// Remove unused import if necessary, but keep for now
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import { useGetStatsQuery } from '../app/Serves/crudStats';

export default function Dashboard() {
  const { data: statsData, isLoading, error } = useGetStatsQuery();

  const stats = [
    {
      title: 'Total Revenue',
      value: statsData?.data ? `$${statsData.data.totalRevenue.toLocaleString()}` : '$0',
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: 'Active Orders',
      value: statsData?.data ? statsData.data.activeOrders.toString() : '0',
      icon: ShoppingCart,
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: 'Inventory Health',
      value: statsData?.data ? statsData.data.inventoryHealth.toString() : '0',
      icon: Package,
      suffix: '%',
      trend: { value: 2.1, isPositive: false },
    },
    {
      title: 'Site Traffic',
      value: statsData?.data ? statsData.data.siteTraffic.toLocaleString() : '0',
      icon: Activity,
      trend: { value: 15.7, isPositive: true },
    },
  ];

  const networkData = statsData?.data.salesActivity.map(item => ({
    time: `${item.hour}:00`,
    value: item.sales
  })) || [];

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="flex items-center justify-center h-screen text-red-500">
              Error loading dashboard data
          </div>
      );
  }

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

      
    </motion.div>
  );
}
