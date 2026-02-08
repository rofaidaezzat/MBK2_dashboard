import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';
import DataGrid from '../components/DataGrid';
import ViewModal from '../components/OrderModal/ViewModal';
import DeleteModal from '../components/OrderModal/DeleteModal';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'calibrating' | 'in-transit' | 'signal-locked' | 'cancelled';
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 'TRX-2047',
    customer: 'Stellar Networks Inc.',
    date: '2024-02-02 14:32',
    total: 1849.99,
    status: 'signal-locked',
    items: 3,
  },
  {
    id: 'TRX-2046',
    customer: 'Quantum Data Systems',
    date: '2024-02-02 12:15',
    total: 899.98,
    status: 'in-transit',
    items: 2,
  },
  {
    id: 'TRX-2045',
    customer: 'NeuralCorp',
    date: '2024-02-02 09:48',
    total: 2449.97,
    status: 'in-transit',
    items: 5,
  },
  {
    id: 'TRX-2044',
    customer: 'CyberMesh Solutions',
    date: '2024-02-01 18:22',
    total: 599.99,
    status: 'calibrating',
    items: 1,
  },
  {
    id: 'TRX-2043',
    customer: 'DataStream Networks',
    date: '2024-02-01 15:07',
    total: 1299.98,
    status: 'signal-locked',
    items: 4,
  },
  {
    id: 'TRX-2042',
    customer: 'HyperLink Technologies',
    date: '2024-02-01 11:33',
    total: 449.99,
    status: 'cancelled',
    items: 1,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleDeleteOrder = () => {
    if (selectedOrder) {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const openDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      'calibrating': 'bg-blue-500/20 border-blue-500/50 text-blue-500',
      'in-transit': 'bg-purple-500/20 border-purple-500/50 text-purple-500',
      'signal-locked': 'bg-green-500/20 border-green-500/50 text-green-500',
      'cancelled': 'bg-red-500/20 border-red-500/50 text-red-500',
    };

    const labels = {
      'calibrating': 'CALIBRATING',
      'in-transit': 'IN TRANSIT',
      'signal-locked': 'SIGNAL LOCKED',
      'cancelled': 'TERMINATED',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 border rounded text-xs font-orbitron font-semibold ${styles[status]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {labels[status]}
      </span>
    );
  };

  const columns = [
    { key: 'id', label: 'Transmission ID', width: '140px' },
    { key: 'customer', label: 'Origin Node', width: 'auto' },
    { key: 'date', label: 'Timestamp', width: '180px' },
    { key: 'items', label: 'Packets', width: '100px' },
    { key: 'total', label: 'Total Value', width: '140px' },
    { key: 'status', label: 'Signal Status', width: '180px' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const tableData = orders.map(order => ({
    id: <span className="font-mono text-cyan-500">{order.id}</span>,
    customer: <span className="font-semibold">{order.customer}</span>,
    date: <span className="font-mono text-gray-400 text-xs">{order.date}</span>,
    items: <span className="font-mono">{order.items}</span>,
    total: <span className="font-orbitron font-semibold text-white">${order.total.toFixed(2)}</span>,
    status: getStatusBadge(order.status),
    actions: (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleViewOrder(order)}
          className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center justify-center text-cyan-500 hover:bg-cyan-500/30 transition-all"
        >
          <Eye size={14} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openDeleteModal(order)}
          className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded flex items-center justify-center text-red-500 hover:bg-red-500/30 transition-all"
        >
          <Trash2 size={14} />
        </motion.button>
      </div>
    ),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Transmission Logs</h1>
          <p className="text-gray-400 font-inter">Order tracking and management system</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all font-inter"
          >
            Export Data
          </motion.button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Calibrating',
            value: orders.filter(o => o.status === 'calibrating').length,
            color: 'blue',
          },
          {
            label: 'In Transit',
            value: orders.filter(o => o.status === 'in-transit').length,
            color: 'purple',
          },
          {
            label: 'Signal Locked',
            value: orders.filter(o => o.status === 'signal-locked').length,
            color: 'green',
          },
          {
            label: 'Terminated',
            value: orders.filter(o => o.status === 'cancelled').length,
            color: 'red',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 font-inter mb-1">{stat.label}</div>
            <div className={`text-2xl font-orbitron font-bold ${
              stat.color === 'blue' ? 'text-blue-500' :
              stat.color === 'purple' ? 'text-purple-500' :
              stat.color === 'green' ? 'text-green-500' : 'text-red-500'
            }`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DataGrid columns={columns} data={tableData} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-orbitron font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Order TRX-2047 status changed to Signal Locked', time: '5 minutes ago', user: 'System Auto' },
            { action: 'New order TRX-2046 received from Quantum Data Systems', time: '2 hours ago', user: 'Admin' },
            { action: 'Order TRX-2045 shipped via Express Protocol', time: '5 hours ago', user: 'Logistics' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-dark-900/50 border border-cyan-500/10 rounded"
            >
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm text-gray-300 font-inter mb-1">{activity.action}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-inter">
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ViewModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteOrder}
        orderId={selectedOrder?.id || ''}
      />
    </motion.div>
  );
}
