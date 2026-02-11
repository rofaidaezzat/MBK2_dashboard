import Modal from '../Modal';
import { useDeleteProductMutation } from '../../app/Serves/crudProduct';
import { Loader2 } from 'lucide-react';

interface DeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  productId?: string; // Added productId
}

export default function DeleteProduct({ isOpen, onClose, onConfirm, productName, productId }: DeleteProductProps) {
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleConfirm = async () => {
        if (productId) {
            try {
                await deleteProduct(productId).unwrap();
                onConfirm(); // This just closes modal in parent
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      <div className="space-y-6">
        <p className="text-gray-300">
          Are you sure you want to delete <span className="font-semibold text-white">{productName}</span>? 
          This action cannot be undone and will remove the protocol from the system permanently.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 text-sm font-medium rounded hover:bg-red-500/30 transition-all font-orbitron flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
            Delete Protocol
          </button>
        </div>
      </div>
    </Modal>
  );
}
