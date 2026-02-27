export type TransferStatus = 'تم التحويل' | 'قيد المعالجة' | 'مرفوضة';

export type Transfer = {
  id: string;
  amount: string;
  bank: string;
  date: string;
  status: TransferStatus;
};
