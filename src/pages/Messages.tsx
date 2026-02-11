import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Search, Mail, Loader2 } from 'lucide-react';
import DataGrid from '../components/DataGrid';
import ViewMessage from '../components/MessageModal/ViewMessage';
import DeleteMessage from '../components/MessageModal/DeleteMessage';
import { useGetMessagesQuery, Message } from '../app/Serves/crudContact';

export default function Messages() {
  const { data, isLoading, isError } = useGetMessagesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const messages = data?.data || [];

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (message: Message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const filteredMessages = messages.filter(message =>
    (message.name && message.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (message.email && message.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    { key: 'name', label: 'Name', width: '200px' },
    { key: 'email', label: 'Email', width: '250px' },
    { key: 'message', label: 'Message', width: 'auto' },
    { key: 'date', label: 'Received', width: '180px' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const tableData = filteredMessages.map(message => ({
    name: <span className="font-semibold text-white">{message.name}</span>,
    email: <span className="text-gray-300">{message.email}</span>,
    message: <span className="text-gray-400 text-sm truncate max-w-xs block" title={message.message}>{message.message}</span>,
    date: <span className="font-mono text-gray-400 text-xs">{new Date(message.createdAt).toLocaleString()}</span>,
    actions: (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleViewMessage(message)}
          className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center justify-center text-cyan-500 hover:bg-cyan-500/30 transition-all"
        >
          <Eye size={14} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => openDeleteModal(message)}
          className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded flex items-center justify-center text-red-500 hover:bg-red-500/30 transition-all"
        >
          <Trash2 size={14} />
        </motion.button>
      </div>
    ),
  }));

  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-cyan-500" size={48} />
          </div>
      )
  }

  if (isError) {
      return <div className="text-red-500 text-center">Failed to load messages</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Access Control</h1>
          <p className="text-gray-400 font-inter">System messages and notifications</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Mail className="text-white" size={24} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search messages by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Total Messages', value: messages.length, color: 'cyan' },
          { label: 'Recent', value: messages.filter(m => new Date(m.createdAt).getTime() > Date.now() - 86400000).length, color: 'green' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400 font-inter mb-1">{stat.label}</div>
            <div className={`text-2xl font-orbitron font-bold ${
              stat.color === 'cyan' ? 'text-cyan-500' : 'text-green-500'
            }`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DataGrid columns={columns} data={tableData} />
      </motion.div>

      <ViewMessage
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        message={selectedMessage}
      />

      <DeleteMessage
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        messageId={selectedMessage?._id || ''}
        senderName={selectedMessage?.name || ''}
      />
    </motion.div>
  );
}