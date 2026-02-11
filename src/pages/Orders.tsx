import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Search, ShoppingCart, Loader2 } from 'lucide-react';
import DataGrid from '../components/DataGrid';
import ViewOrder from '../components/OrderModal/ViewOrder';
import DeleteOrder from '../components/OrderModal/DeleteOrder';
import { useGetOrdersQuery, Order } from '../app/Serves/crudOrders';

export default function Orders() {
  const { data, isLoading, isError } = useGetOrdersQuery({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders = data?.data || [];

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const filteredOrders = orders.filter(order =>
    (order.guestName && order.guestName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.guestEmail && order.guestEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-blue-500/20 border-blue-500/50 text-blue-500',
      completed: 'bg-green-500/20 border-green-500/50 text-green-500',
      cancelled: 'bg-red-500/20 border-red-500/50 text-red-500',
    };

    const style = styles[status] || 'bg-gray-500/20 border-gray-500/50 text-gray-500';

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 border rounded text-xs font-orbitron font-semibold ${style}`}>
        {status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
        {status.toUpperCase()}
      </span>
    );
  };

  const columns = [

    { key: 'customer', label: 'Customer', width: '200px' },
    { key: 'items', label: 'Items', width: '100px' },
    { key: 'total', label: 'Total', width: '140px' },
  
    { key: 'date', label: 'Date', width: '180px' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const tableData = filteredOrders.map(order => ({
    customer: (
      <div className="flex flex-col">
        <span className="font-semibold text-white">{order.guestName}</span>
        <span className="text-xs text-gray-400">{order.guestEmail}</span>
      </div>
    ),
    items: <span className="font-mono text-gray-300">{order.items.length}</span>,
    total: <span className="font-orbitron font-semibold text-green-400">${order.totalAmount}</span>,
    status: getStatusBadge(order.status),
    date: <span className="font-mono text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">Failed to load orders</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Order Management</h1>
          <p className="text-gray-400 font-inter">Track and manage customer orders</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShoppingCart className="text-white" size={24} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search orders by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, color: 'blue' },
          { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'purple' },
          { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: 'green' },
          { label: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, color: 'red' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 font-inter mb-1">{stat.label}</div>
           
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DataGrid columns={columns} data={tableData} />
      </motion.div>

      <ViewOrder
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />

      <DeleteOrder
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        orderId={selectedOrder?._id || ''}
      />
    </motion.div>
  );
}
