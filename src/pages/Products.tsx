import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import DataGrid from '../components/DataGrid';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'low' | 'out';
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'HyperSpeed Router X-200',
    price: 299.99,
    stock: 45,
    status: 'active',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'PRD-002',
    name: 'Quantum Switch Pro',
    price: 449.99,
    stock: 8,
    status: 'low',
    image: 'https://images.pexels.com/photos/2582935/pexels-photo-2582935.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'PRD-003',
    name: 'NeuralLink Gateway',
    price: 599.99,
    stock: 0,
    status: 'out',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'PRD-004',
    name: 'FiberOptic Cable Bundle',
    price: 89.99,
    stock: 156,
    status: 'active',
    image: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 'PRD-005',
    name: 'Network Security Pod',
    price: 799.99,
    stock: 23,
    status: 'active',
    image: 'https://images.pexels.com/photos/2582926/pexels-photo-2582926.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState<Product[]>(mockProducts);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Product['status']) => {
    const styles = {
      active: 'bg-green-500/20 border-green-500/50 text-green-500',
      low: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500',
      out: 'bg-red-500/20 border-red-500/50 text-red-500',
    };

    const labels = {
      active: 'OPERATIONAL',
      low: 'LOW STOCK',
      out: 'DEPLETED',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 border rounded text-xs font-orbitron font-semibold ${styles[status]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {labels[status]}
      </span>
    );
  };

  const columns = [
    { key: 'image', label: 'Visual ID', width: '100px' },
    { key: 'id', label: 'Protocol ID', width: '120px' },
    { key: 'name', label: 'Designation', width: 'auto' },
    { key: 'price', label: 'Value', width: '120px' },
    { key: 'stock', label: 'Quantity', width: '100px' },
    { key: 'status', label: 'Status', width: '150px' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const tableData = filteredProducts.map(product => ({
    image: (
      <img
        src={product.image}
        alt={product.name}
        className="w-12 h-12 rounded border border-cyan-500/30 object-cover"
      />
    ),
    id: <span className="font-mono text-cyan-500">{product.id}</span>,
    name: <span className="font-semibold">{product.name}</span>,
    price: <span className="font-orbitron">${product.price.toFixed(2)}</span>,
    stock: <span className="font-mono">{product.stock}</span>,
    status: getStatusBadge(product.status),
    actions: (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center justify-center text-cyan-500 hover:bg-cyan-500/30 transition-all"
        >
          <Edit size={14} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Inventory Grid</h1>
          <p className="text-gray-400 font-inter">Product catalog management system</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Plus size={20} />
          Add Protocol
        </motion.button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search inventory by name or protocol ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all font-inter"
        >
          Filters
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: products.length, color: 'cyan' },
          { label: 'Low Stock Items', value: products.filter(p => p.status === 'low').length, color: 'yellow' },
          { label: 'Out of Stock', value: products.filter(p => p.status === 'out').length, color: 'red' },
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
              stat.color === 'cyan' ? 'text-cyan-500' :
              stat.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {stat.value}
            </div>
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
    </motion.div>
  );
}
