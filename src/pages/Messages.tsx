import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Search, Mail } from 'lucide-react';
import DataGrid from '../components/DataGrid';
import ViewMessage from '../components/MessageModal/ViewMessage';
import DeleteMessage from '../components/MessageModal/DeleteMessage';

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: string;
  status: 'new' | 'read' | 'archived';
}

const mockMessages: Message[] = [
  {
    id: 'MSG-001',
    sender: 'John Doe',
    subject: 'System Access Request',
    content: 'Requesting access to the inventory management system for the new intern.',
    date: '2024-02-08 10:30',
    status: 'new',
  },
  {
    id: 'MSG-002',
    sender: 'Jane Smith',
    subject: 'Bug Report: Order Processing',
    content: 'Found a bug in the order processing module when handling bulk orders.',
    date: '2024-02-07 15:45',
    status: 'read',
  },
  {
    id: 'MSG-003',
    sender: 'Network Admin',
    subject: 'Scheduled Maintenance',
    content: 'The system will undergo scheduled maintenance on Sunday at 02:00 UTC.',
    date: '2024-02-06 09:00',
    status: 'archived',
  },
  {
    id: 'MSG-004',
    sender: 'Sarah Connor',
    subject: 'Security Alert',
    content: 'Potential security breach detected in sector 7G. Immediate action required.',
    date: '2024-02-05 18:20',
    status: 'new',
  },
  {
    id: 'MSG-005',
    sender: 'Help Desk',
    subject: 'Ticket #402 Resolved',
    content: 'The issue regarding the login timeout has been resolved.',
    date: '2024-02-05 11:15',
    status: 'read',
  },
];

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    // Optionally mark as read here
    if (message.status === 'new') {
        setMessages(messages.map(m => m.id === message.id ? { ...m, status: 'read' } : m));
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
    }
  };

  const openDeleteModal = (message: Message) => {
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Message['status']) => {
    const styles = {
      new: 'bg-green-500/20 border-green-500/50 text-green-500',
      read: 'bg-blue-500/20 border-blue-500/50 text-blue-500',
      archived: 'bg-gray-500/20 border-gray-500/50 text-gray-500',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 border rounded text-xs font-orbitron font-semibold ${styles[status]}`}>
        {status === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
        {status.toUpperCase()}
      </span>
    );
  };

  const columns = [
    { key: 'sender', label: 'Sender', width: '200px' },
    { key: 'subject', label: 'Subject', width: 'auto' },
    { key: 'date', label: 'Received', width: '180px' },
    { key: 'status', label: 'Status', width: '120px' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const tableData = filteredMessages.map(message => ({
    sender: <span className="font-semibold text-white">{message.sender}</span>,
    subject: <span className="text-gray-300">{message.subject}</span>,
    date: <span className="font-mono text-gray-400 text-xs">{message.date}</span>,
    status: getStatusBadge(message.status),
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
            placeholder="Search messages by sender or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-dark-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-inter"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Messages', value: messages.length, color: 'cyan' },
          { label: 'Unread', value: messages.filter(m => m.status === 'new').length, color: 'green' },
          { label: 'Archived', value: messages.filter(m => m.status === 'archived').length, color: 'gray' },
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
              stat.color === 'cyan' ? 'text-cyan-500' :
              stat.color === 'green' ? 'text-green-500' : 'text-gray-400'
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
        onConfirm={handleDeleteMessage}
        senderName={selectedMessage?.sender || ''}
      />
    </motion.div>
  );
}