import Modal from '../Modal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderId: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, orderId }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terminate Transmission">
      <div className="space-y-6">
        <p className="text-gray-300">
          Are you sure you want to terminate transmission <span className="font-mono text-cyan-500">{orderId}</span>? 
          This action will permanently delete all associated logs and data packets.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 text-sm font-medium rounded hover:bg-red-500/30 transition-all font-orbitron"
          >
            Confirm Termination
          </button>
        </div>
      </div>
    </Modal>
  );
}
