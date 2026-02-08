
import Modal from '../Modal';

interface DeleteMessageProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  senderName: string;
}

export default function DeleteMessage({ isOpen, onClose, onConfirm, senderName }: DeleteMessageProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Message">
      <div className="space-y-6">
        <p className="text-gray-300">
          Are you sure you want to delete the message from <span className="font-semibold text-white">{senderName}</span>? 
          This action cannot be undone.
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
            Confirm Deletion
          </button>
        </div>
      </div>
    </Modal>
  );
}
