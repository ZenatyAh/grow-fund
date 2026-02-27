"use client";

import React from 'react';

type InvoiceProps = {
    campaignTitle: string;
    amountLabel: string;
    totalLabel: string;
    transactionId: string;
    dateLabel: string;
    lang?: 'ar' | 'en';
};

const Invoice: React.FC<InvoiceProps> = ({
    campaignTitle,
    amountLabel,
    totalLabel,
    transactionId,
    dateLabel,
    lang = 'ar',
}) => {
    const isRtl = lang === 'ar';

    return (
        <div className="min-h-screen bg-gray-100 py-10 print:bg-white">
            <div
                className="mx-auto w-[820px] rounded bg-white p-8 shadow print:shadow-none print:rounded-none print:p-0"
                dir={isRtl ? 'rtl' : 'ltr'}
                lang={lang}
            >
                <header className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded bg-blue-600/10 p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-full w-full text-blue-600"
                            >
                                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-slate-700">Grow Fund</div>
                            <div className="text-xs text-slate-500">www.grow-fund.example</div>
                        </div>
                    </div>

                    <div className="text-right">
                        <h2 className="text-lg font-bold text-slate-800">{isRtl ? 'فاتورة تبرع' : 'Donation Invoice'}</h2>
                        <div className="text-xs text-slate-500">{isRtl ? 'رقم الفاتورة' : 'Invoice ID'}: {transactionId}</div>
                    </div>
                </header>

                <section className="mb-6 grid gap-3 sm:grid-cols-2">
                    <div>
                        <div className="mb-2 text-sm font-medium text-slate-600">{isRtl ? 'الحملة' : 'Campaign'}</div>
                        <div className="text-base font-semibold text-slate-800">{campaignTitle}</div>
                    </div>

                    <div>
                        <div className="mb-2 text-sm font-medium text-slate-600">{isRtl ? 'التاريخ' : 'Date'}</div>
                        <div className="text-base font-semibold text-slate-800">{dateLabel}</div>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="overflow-hidden rounded border border-slate-100">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                            <div>{isRtl ? 'الوصف' : 'Description'}</div>
                            <div>{isRtl ? 'المبلغ' : 'Amount'}</div>
                        </div>
                        <div className="flex items-center justify-between px-4 py-4 text-sm">
                            <div className="text-slate-700">{campaignTitle} — {isRtl ? 'تبرع' : 'Donation'}</div>
                            <div className="font-medium text-slate-800">{amountLabel}</div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-4 text-sm font-semibold">
                            <div className="text-slate-700">{isRtl ? 'الإجمالي' : 'Total'}</div>
                            <div className="text-slate-800">{totalLabel}</div>
                        </div>
                    </div>
                </section>

                <footer className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <div>{isRtl ? 'شكراً لتبرعك ودعمك!' : 'Thank you for your support!'}</div>
                    <div className="print:hidden">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            {isRtl ? 'طباعة / حفظ كـ PDF' : 'Print / Save as PDF'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Invoice;
