import {
  Clock,
  CheckCircle,
  CreditCard,
  XCircle,
  RefreshCw,
  FileText,
  MessageCircle,
  Bell,
} from 'lucide-react';

export const getStatusColor = (status: string) => {
  if (!status) return <MessageCircle className="w-4 h-4" />;
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'paid':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'publication':
      return 'bg-green-100 text-green-800';
    case 'draft':
      return 'bg-yellow-50 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusIcon = (status: string) => {
  if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
  switch (status.toLowerCase()) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'paid':
      return <CreditCard className="w-4 h-4 text-blue-500" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'processing':
      return <RefreshCw className="w-4 h-4 text-purple-500 animate-spin" />;
    case 'publication':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'draft':
      return <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span>;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};