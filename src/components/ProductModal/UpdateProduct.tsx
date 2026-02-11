import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { useUpdateProductMutation } from '../../app/Serves/crudProduct';
import { Loader2, Plus, X } from 'lucide-react';

interface Product {
  _id: string; // Changed from id to _id
  title: string; // Changed from name to title
  description: string;
  price: number;
  category: string;
  stock: number;
  tags: string[];
  images: string[];
}

interface UpdateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
  product: Product | null;
}

export default function UpdateProduct({ isOpen, onClose, onSubmit, product }: UpdateProductProps) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    tags: [] as string[],
    images: [''],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock.toString(),
          tags: product.tags || [],
          images: product.images && product.images.length > 0 ? product.images : [''],
      });
    }
  }, [product]);

  const handleAddTag = () => {
      if (tagInput.trim()) {
          setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
          setTagInput('');
      }
  };

  const removeTag = (tagToRemove: string) => {
      setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleImageChange = (index: number, value: string) => {
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData(prev => ({ ...prev, images: newImages }));
  }

  const addImageField = () => {
      setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  }

  const removeImageField = (index: number) => {
      if (formData.images.length > 1) {
          const newImages = formData.images.filter((_, i) => i !== index);
          setFormData(prev => ({ ...prev, images: newImages }));
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            images: formData.images.filter(img => img.trim() !== '')
        };
        await updateProduct({ id: product._id, body: payload }).unwrap();
        onClose();
    } catch (error) {
        console.error("Failed to update product:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Protocol">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
           <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px]"
           />
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Stock</label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
                {formData.tags.map(tag => (
                    <span key={tag} className="bg-cyan-500/20 text-cyan-500 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-cyan-300"><X size={14}/></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Add a tag..."
                />
                <button type="button" onClick={handleAddTag} className="bg-cyan-500/20 text-cyan-500 px-3 py-2 rounded hover:bg-cyan-500/30">Add</button>
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Image URLs</label>
          <div className="space-y-2">
              {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={img}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        required={index === 0}
                      />
                      {formData.images.length > 1 && (
                          <button type="button" onClick={() => removeImageField(index)} className="text-red-500 p-2 hover:bg-red-500/10 rounded">
                              <X size={20} />
                          </button>
                      )}
                  </div>
              ))}
              <button type="button" onClick={addImageField} className="text-sm text-cyan-500 flex items-center gap-1 hover:text-cyan-400">
                  <Plus size={16} /> Add another image URL
              </button>
          </div>
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
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-orbitron flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
            Update Protocol
          </button>
        </div>
      </form>
    </Modal>
  );
}
