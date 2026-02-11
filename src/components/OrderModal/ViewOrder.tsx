import Modal from '../Modal';
import { Order } from '../../app/Serves/crudOrders';
import { Package, MapPin, User, DollarSign, Calendar } from 'lucide-react';

interface ViewOrderProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function ViewOrder({ isOpen, onClose, order }: ViewOrderProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/20 border-green-500/50';
      case 'cancelled': return 'text-red-500 bg-red-500/20 border-red-500/50';
      default: return 'text-blue-500 bg-blue-500/20 border-blue-500/50';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Details: ${order._id}`}>
      <div className="space-y-6">
        {/* Header Status */}
        <div className="flex justify-between items-center pb-4 border-b border-cyan-500/20">
          <div className={`px-3 py-1 rounded border text-sm font-orbitron ${getStatusColor(order.status)}`}>
            {order.status.toUpperCase()}
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
            <Calendar size={14} />
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-dark-900/50 rounded border border-cyan-500/10">
            <h4 className="flex items-center gap-2 text-cyan-500 font-orbitron mb-3">
              <User size={16} /> Customer Info
            </h4>
            <div className="space-y-1 text-sm text-gray-300 font-inter">
              <p><span className="text-gray-500">Name:</span> {order.guestName}</p>
              <p><span className="text-gray-500">Email:</span> {order.guestEmail}</p>
              <p><span className="text-gray-500">Phone:</span> {order.guestPhone}</p>
            </div>
          </div>
          <div className="p-4 bg-dark-900/50 rounded border border-cyan-500/10">
            <h4 className="flex items-center gap-2 text-cyan-500 font-orbitron mb-3">
              <MapPin size={16} /> Shipping Info
            </h4>
            <div className="space-y-1 text-sm text-gray-300 font-inter">
              <p><span className="text-gray-500">Address:</span> {order.shippingAddress}</p>
              <p><span className="text-gray-500">Method:</span> {order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="flex items-center gap-2 text-cyan-500 font-orbitron mb-3">
            <Package size={16} /> Order Items
          </h4>
          <div className="bg-dark-900/50 rounded border border-cyan-500/10 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-cyan-500/10 text-cyan-500 font-orbitron">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10 text-gray-300 font-inter">
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td className="p-3">{item.product.title}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">${item.price}</td>
                    <td className="p-3 text-right text-white font-mono">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-dark-800/80 font-bold text-white border-t border-cyan-500/20">
                <tr>
                  <td colSpan={3} className="p-3 text-right font-orbitron">Total Amount</td>
                  <td className="p-3 text-right font-mono text-cyan-400 flex items-center justify-end gap-1">
                    <DollarSign size={14} />
                    {order.totalAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
