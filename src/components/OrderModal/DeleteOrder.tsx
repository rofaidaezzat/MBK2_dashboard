import Modal from '../Modal';
import { useDeleteOrderMutation } from '../../app/Serves/crudOrders';
import { Loader2, AlertTriangle } from 'lucide-react';

interface DeleteOrderProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export default function DeleteOrder({ isOpen, onClose, orderId }: DeleteOrderProps) {
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleConfirm = async () => {
    try {
      await deleteOrder(orderId).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Order">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="p-3 bg-red-500/20 rounded-full text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-500 font-orbitron">Warning: Permanent Action</h3>
            <p className="text-sm text-gray-400 font-inter mt-1">
              You are about to permanently delete order <span className="font-mono text-white">{orderId}</span>. 
              This action cannot be undone and will remove all associated data.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 text-gray-400 text-sm font-medium rounded hover:bg-dark-800 transition-all font-orbitron"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 text-sm font-medium rounded hover:bg-red-500/30 transition-all font-orbitron flex items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={14} />}
            Confirm Deletion
          </button>
        </div>
      </div>
    </Modal>
  );
}
