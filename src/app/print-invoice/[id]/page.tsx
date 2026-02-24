"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Invoice from '../../../components/invoice/Invoice';

const PrintInvoicePage = () => {
    const params = useParams();
    const id = params?.id ?? '';
    const search = useSearchParams();

    const amount = search?.get('amount') ?? '200';
    const total = search?.get('total') ?? amount;
    const trx = search?.get('trx') ?? 'TRX-1002';
    const date = search?.get('date') ?? '';
    const lang = search?.get('lang') === 'en' ? 'en' : 'ar';

    const amountLabel = `${amount} ش`;
    const totalLabel = `${total} ش`;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-[900px] px-4 py-8">
                <Invoice
                    campaignTitle={`#${id}`}
                    amountLabel={amountLabel}
                    totalLabel={totalLabel}
                    transactionId={trx}
                    dateLabel={date}
                    lang={lang as 'ar' | 'en'}
                />
            </div>
        </main>
    );
};

export default PrintInvoicePage;
