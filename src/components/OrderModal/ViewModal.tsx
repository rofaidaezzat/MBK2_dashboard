import Modal from '../Modal';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'calibrating' | 'in-transit' | 'signal-locked' | 'cancelled';
  items: number;
}

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function ViewModal({ isOpen, onClose, order }: ViewModalProps) {
  if (!order) return null;

  const statusColors = {
    'calibrating': 'text-blue-500',
    'in-transit': 'text-purple-500',
    'signal-locked': 'text-green-500',
    'cancelled': 'text-red-500',
  };

  const statusLabels = {
    'calibrating': 'CALIBRATING',
    'in-transit': 'IN TRANSIT',
    'signal-locked': 'SIGNAL LOCKED',
    'cancelled': 'TERMINATED',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Transmission Details: ${order.id}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Origin Node</span>
            <p className="text-lg font-semibold text-white">{order.customer}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Timestamp</span>
            <p className="text-lg font-mono text-gray-300">{order.date}</p>
          </div>
        </div>

        <div className="p-4 bg-dark-800/50 rounded-lg border border-cyan-500/10">
          <div className="flex items-center justify-between mb-2">
             <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Signal Status</span>
             <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full animate-pulse ${statusColors[order.status].replace('text-', 'bg-')}`} />
               <span className={`font-orbitron font-bold ${statusColors[order.status]}`}>
                 {statusLabels[order.status]}
               </span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-cyan-500/10">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Packet Count</span>
            <p className="text-xl font-mono text-white">{order.items}</p>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-xs text-gray-500 font-inter uppercase tracking-wider">Total Value</span>
            <p className="text-2xl font-orbitron font-bold text-cyan-500">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
