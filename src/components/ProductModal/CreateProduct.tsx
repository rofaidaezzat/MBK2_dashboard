import React, { useState } from 'react';
import Modal from '../Modal';
// @ts-ignore
import { useAddProductMutation } from '../../app/Serves/crudProduct';
import { Loader2, X, Plus } from 'lucide-react';

interface CreateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
}

export default function CreateProduct({ isOpen, onClose }: CreateProductProps) {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    tags: [] as string[],
    images: [] as File[],
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Debug: Check token when modal opens
  React.useEffect(() => {
    if (isOpen) {
        const token = localStorage.getItem('token');
        console.log("CreateProduct Modal Open. Token in localStorage:", token);
    }
  }, [isOpen]);

  const handleAddTag = () => {
      if (tagInput.trim()) {
          setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
          setTagInput('');
      }
  };

  const removeTag = (tagToRemove: string) => {
      setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => {
        const newPreviews = prev.filter((_, i) => i !== index);
        // Revoke URL to avoid memory leaks
        URL.revokeObjectURL(prev[index]);
        return newPreviews;
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('stock', formData.stock);
        
        formData.tags.forEach(tag => formDataToSend.append('tags', tag));
        formData.images.forEach(image => formDataToSend.append('images', image));

        console.log("Submitting product payload (FormData)");

        // @ts-ignore
        await addProduct(formDataToSend).unwrap();
        setFormData({ title: '', description: '', price: '', category: '', stock: '', tags: [], images: [] });
        setImagePreviews([]);
        onClose();
      
    } catch (err: any) {
        console.error("Failed to create product:", err);
        
        let errorMessage = 'Failed to create product. Please try again.';
        
        if (err?.data?.message) {
            // Standard API error message
            errorMessage = `Error: ${err.data.message}`;
        } else if (err?.status === 500) {
            // Server error, possibly HTML response
            errorMessage = 'Server Error (500). The server encountered an issue. This might be due to a duplicate title or invalid data.';
        } else if (err?.data && typeof err.data === 'string' && err.data.includes('<!DOCTYPE html>')) {
             // HTML error page caught in data
             errorMessage = 'Server returned an HTML error page instead of JSON. Check console for details.';
        }

        alert(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="e.g. WiFi Cover"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
           <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-dark-800 border border-cyan-500/20 rounded p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors min-h-[100px]"
            placeholder="Detailed description..."
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
                placeholder="Product Category"
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
              placeholder="0.00"
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
              placeholder="0"
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
          <label className="block text-sm font-medium text-gray-400 mb-1">Product Images</label>
          <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                  {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group w-24 h-24 rounded overflow-hidden border border-cyan-500/20">
                          <img src={preview} alt={`Product Preview ${index}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                              <X size={12} />
                          </button>
                      </div>
                  ))}
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/20 rounded cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
                      <Plus className="text-cyan-500 mb-1" size={24} />
                      <span className="text-xs text-cyan-500">Upload</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden" 
                      />
                  </label>
              </div>
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
            Create Product
          </button>
        </div>
      </form>
    </Modal>
  );
}
