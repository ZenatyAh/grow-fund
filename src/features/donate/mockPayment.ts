export type DonationPaymentPayload = {
  campaignId: string;
  amount: number;
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
  saveCard: boolean;
  anonymous: boolean;
  method: 'card' | 'paypal';
  mockStatus?: 'success' | 'failed' | null;
};

export type DonationPaymentResult = {
  status: 'success' | 'failed';
  transactionId: string;
  processedAt: string;
  reason?: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildTransactionId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TRX-${random}`;
};

export const mockConfirmDonation = async (
  payload: DonationPaymentPayload
): Promise<DonationPaymentResult> => {
  await wait(900);

  if (payload.mockStatus === 'success') {
    return {
      status: 'success',
      transactionId: buildTransactionId(),
      processedAt: new Date().toISOString(),
    };
  }

  if (payload.mockStatus === 'failed') {
    return {
      status: 'failed',
      transactionId: buildTransactionId(),
      processedAt: new Date().toISOString(),
      reason: 'تم رفض العملية من مزود الدفع. الرجاء المحاولة ببطاقة أخرى.',
    };
  }

  const digits = payload.cardNumber.replace(/\D/g, '');
  const lastDigit = Number(digits[digits.length - 1] ?? 0);

  const shouldFail = lastDigit === 0 || lastDigit === 1;

  if (shouldFail) {
    return {
      status: 'failed',
      transactionId: buildTransactionId(),
      processedAt: new Date().toISOString(),
      reason: 'تم رفض العملية من مزود الدفع. الرجاء المحاولة ببطاقة أخرى.',
    };
  }

  return {
    status: 'success',
    transactionId: buildTransactionId(),
    processedAt: new Date().toISOString(),
  };
};
