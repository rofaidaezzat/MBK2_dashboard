import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'low' | 'out';
  image: string;
}

interface UpdateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product: Product | null;
}

export default function UpdateProduct({ isOpen, onClose, onSubmit, product }: UpdateProductProps) {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    stock: 0,
    status: 'active',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Protocol">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Designation</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Value ($)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
           <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
           >
             <option value="active">Operational</option>
             <option value="low">Low Stock</option>
             <option value="out">Depleted</option>
           </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-orbitron"
          >
            Update Protocol
          </button>
        </div>
      </form>
    </Modal>
  );
}
