
import Modal from '../Modal';
interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: string;
  status: 'new' | 'read' | 'archived';
}

interface ViewMessageProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

export default function ViewMessage({ isOpen, onClose, message }: ViewMessageProps) {
  if (!message) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Message: ${message.subject}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Sender</span>
            <p className="text-lg font-semibold text-white">{message.sender}</p>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Received</span>
            <p className="text-sm font-mono text-gray-300">{message.date}</p>
          </div>
        </div>

        <div className="p-4 bg-dark-800/50 rounded-lg border border-cyan-500/10 min-h-[150px]">
          <p className="text-gray-300 font-inter leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-cyan-500/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-orbitron"
          >
            Close Transmission
          </button>
        </div>
      </div>
    </Modal>
  );
}
