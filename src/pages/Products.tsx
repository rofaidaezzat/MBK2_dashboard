import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import DataGrid from '../components/DataGrid';
import CreateProduct from '../components/ProductModal/CreateProduct';
import UpdateProduct from '../components/ProductModal/UpdateProduct';
import DeleteProduct from '../components/ProductModal/DeleteProduct';
import { useGetProductsQuery } from '../app/Serves/crudProduct';
import Pagination from '../components/Pagination';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  tags: string[];
  images: string[];
  status?: 'active' | 'low' | 'out'; // UI helper property
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  
  const { data, isLoading, isError } = useGetProductsQuery({ page, limit });
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCreateProduct = (newProduct: Product) => {
    // API handles update via tag invalidation
    setIsCreateModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
     // API handles update via tag invalidation
    setIsUpdateModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
     // API handles update via tag invalidation
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
  };

  const openUpdateModal = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const products = data?.data || [];
  const pagination = data?.pagination || { currentPage: 1, limit: 10, numberOfPages: 1 };

  // Client-side search for now, could be server-side if API supports it
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product._id.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const columns = [
    { key: 'image', label: 'Visual ID', width: '80px' },
    { key: 'title', label: 'Title', width: '150px' },
    { key: 'category', label: 'Category', width: '120px' },
    { key: 'price', label: 'Price', width: '100px' },
    { key: 'description', label: 'Description', width: 'auto' },
    { key: 'actions', label: 'Actions', width: '100px' },
  ];

  const tableData = filteredProducts.map(product => ({
    image: (
      <img
        src={product.images[0] || 'https://via.placeholder.com/50'}
        alt={product.title}
        className="w-12 h-12 rounded border border-cyan-500/30 object-cover"
      />
    ),
    title: <span className="font-semibold text-white">{product.title}</span>,
    category: <span className="font-inter text-cyan-400">{product.category}</span>,
    price: <span className="font-orbitron text-yellow-500">${product.price.toFixed(2)}</span>,
    description: <span className="text-gray-400 text-sm truncate max-w-xs block" title={product.description}>{product.description}</span>,
    actions: (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openUpdateModal(product)}
          className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center justify-center text-cyan-500 hover:bg-cyan-500/30 transition-all"
        >
          <Edit size={14} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openDeleteModal(product)}
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
      )
  }

  if (isError) {
      return <div className="text-red-500 text-center">Failed to load products</div>
  }

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
          onClick={() => setIsCreateModalOpen(true)}
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
          { label: 'Total Products', value: data?.results || 0, color: 'cyan' },
          { label: 'Low Stock Items', value: products.filter(p => p.stock > 0 && p.stock < 10).length, color: 'yellow' },
          { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, color: 'red' },
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
         <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.numberOfPages} 
            onPageChange={setPage} 
        />
      </motion.div>
      <CreateProduct
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
      />

      <UpdateProduct
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleUpdateProduct}
        product={selectedProduct} // Type mismatch until interface is updated
      />

      <DeleteProduct
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        productName={selectedProduct?.title || ''}
        productId={selectedProduct?._id}
      />
    </motion.div>
  );
}
