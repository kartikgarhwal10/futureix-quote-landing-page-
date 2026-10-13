'use client';

import React, { useState } from 'react';
import { QuoteRecord, Language } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import {
  Printer,
  Download,
  X,
  Languages,
  CheckCircle,
  Building,
  Calendar,
  FileText,
  Clock,
  ShieldAlert,
  Percent,
} from 'lucide-react';

interface QuotationModalProps {
  quote: QuoteRecord;
  onClose: () => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({ quote, onClose }) => {
  const [lang, setLang] = useState<Language>(quote.language || 'en');
  const [showDetailedPricing, setShowDetailedPricing] = useState(true);
  const [showAddons, setShowAddons] = useState(true);

  const calc = quote.calculation;
  const isHi = lang === 'hi';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:max-w-none my-auto">
        {/* Top Control Bar (Hidden during printing) */}
        <div className="bg-brand-navy-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-300">
              Proposal Preview: <strong className="text-white">{quote.quoteNumber}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Language switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>{isHi ? 'Switch to English' : 'हिन्दी में देखें'}</span>
            </button>

            {/* Print / Export PDF button */}
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHi ? 'PDF डाउनलोड करें / प्रिंट' : 'Print / Export PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Proposal Document Body */}
        <div id="proposal-document" className="p-8 sm:p-12 font-sans text-slate-800 bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-brand-navy-800 pb-8 gap-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-black tracking-tight text-brand-navy-950 text-3xl">
                  FUTURE<span className="text-brand-electric-600">IX</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-gold-500"></span>
              </div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mt-1">
                AI • Marketing • Technology
              </p>
              <p className="text-xs text-slate-600 mt-2">{DEFAULT_SITE_SETTINGS.address}</p>
              <p className="text-xs text-slate-600">
                GSTIN: <span className="font-mono font-medium">{DEFAULT_SITE_SETTINGS.gstin}</span>
              </p>
              <p className="text-xs text-slate-600">
                Email: {DEFAULT_SITE_SETTINGS.primaryEmail} | Web: {DEFAULT_SITE_SETTINGS.website}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-brand-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded">
                {isHi ? 'व्यावसायिक प्रस्ताव' : 'OFFICIAL QUOTATION'}
              </span>
              <p className="text-sm font-bold font-mono text-brand-navy-950 mt-2">
                {quote.quoteNumber}
              </p>
              <p className="text-xs text-slate-500">
                {isHi ? 'जारी तिथि:' : 'Issue Date:'}{' '}
                <span className="font-medium text-slate-700">
                  {new Date(quote.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {isHi ? 'वैधता:' : 'Validity:'}{' '}
                <span className="font-medium text-amber-700">
                  {new Date(quote.validUntil).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {isHi ? 'असाइन लीड:' : 'Prepared by:'} {quote.assignedMember || 'Futureix Team'}
              </p>
            </div>
          </div>

          {/* Client & Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                {isHi ? 'ग्राहक विवरण (PREPARED FOR):' : 'PREPARED FOR:'}
              </p>
              <p className="font-bold text-slate-900 text-sm">{quote.customer.company || quote.customer.name}</p>
              <p className="text-slate-700">{isHi ? 'संपर्क:' : 'Attn:'} {quote.customer.name}</p>
              <p className="text-slate-600">{quote.customer.email}</p>
              <p className="text-slate-600">{quote.customer.phone} | {quote.customer.city}</p>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                {isHi ? 'प्रोजेक्ट विवरण (PROJECT SCOPE):' : 'PROJECT SCOPE:'}
              </p>
              <p className="font-bold text-brand-electric-700 text-sm">{quote.projectName}</p>
              <p className="text-slate-700">
                {isHi ? 'प्रारूप:' : 'Classification:'} {quote.state.projectType === 'new' ? 'New Build' : quote.state.projectType}
              </p>
              <p className="text-slate-700">
                {isHi ? 'अनुमानित समय-सीमा:' : 'Estimated Timeline:'}{' '}
                <strong className="text-slate-900">
                  {isHi ? calc.estimatedTimelineHi : calc.estimatedTimelineEn}
                </strong>
              </p>
            </div>
          </div>

          {/* Scope & Deliverables Table */}
          <div className="py-6">
            <h4 className="font-heading text-sm font-bold text-brand-navy-950 uppercase tracking-wider mb-3">
              {isHi ? 'प्रोजेक्ट कार्य-दायरा व मदवार विवरण' : 'Project Scope & Itemized Deliverables'}
            </h4>

            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-4 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">{isHi ? 'सेवा व फीचर' : 'Service & Scope Item'}</th>
                  <th className="py-2.5 px-4 w-28">{isHi ? 'प्रकार' : 'Billing Type'}</th>
                  <th className="py-2.5 px-4 w-36 text-right">{isHi ? 'अनुमानित राशि' : 'Estimated Fee'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calc.lineItems.map((item, idx) => (
                  <tr key={idx} className={item.type === 'third_party' ? 'bg-amber-50/50' : ''}>
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900">
                        {isHi ? item.nameHi : item.nameEn}
                      </p>
                      {item.included && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold mt-0.5">
                          {isHi ? 'मूल पैकेज में शामिल' : 'Base Inclusions Active'}
                        </span>
                      )}
                      {item.type === 'third_party' && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold mt-0.5">
                          {isHi ? 'थर्ड-पार्टी / डायरेक्ट पास-थ्रू' : 'Direct Third-Party Cost'}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 capitalize">
                      {item.billingType === 'monthly' ? (isHi ? 'मासिक रीटेनर' : 'Monthly Retainer') : (isHi ? 'एकमुश्त' : 'One-time')}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-900 font-mono">
                      {formatINR(item.recommendedPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary & Calculations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-t border-slate-200">
            {/* Payment Terms & Notes */}
            <div className="space-y-3 text-xs text-slate-600">
              <h5 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                {isHi ? 'भुगतान मील के पत्थर (Payment Milestones):' : 'Payment Milestones & Commercials:'}
              </h5>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-slate-800">50% Kickoff Advance:</strong>{' '}
                  {isHi ? 'प्रोजेक्ट आरंभ और आर्किटेक्चर कार्य हेतु।' : 'Upon formal scope approval to initiate sprint.'}
                </li>
                <li>
                  <strong className="text-slate-800">50% Launch Completion:</strong>{' '}
                  {isHi ? 'अंतिम QA टेस्टिंग और लाइव डिप्लॉयमेंट से पूर्व।' : 'Upon QA verification and production deployment.'}
                </li>
              </ul>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] leading-relaxed">
                <p className="font-semibold text-slate-800">
                  {isHi ? 'दायरा परिवर्तन नीति (Scope Policy):' : 'Scope Change Policy:'}
                </p>
                <p className="text-slate-500 mt-0.5">
                  {isHi
                    ? 'उल्लिखित दायरे के अतिरिक्त कोई भी नया फीचर लिखित स्वीकृति और अलग से कोटेशन के पश्चात जोड़ा जाएगा।'
                    : 'Any deliverables beyond the explicitly listed items will be quoted separately under a change request.'}
                </p>
              </div>
            </div>

            {/* Calculations Box */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 text-slate-600">
                <span>{isHi ? 'एकमुश्त प्रोजेक्ट सबटोटल:' : 'One-time Implementation Subtotal:'}</span>
                <span className="font-mono font-medium text-slate-900">{formatINR(calc.recommendedSubtotal)}</span>
              </div>

              {calc.recurringMin > 0 && (
                <div className="flex justify-between py-1 text-slate-600 border-t border-slate-200">
                  <span>{isHi ? 'मासिक रीटेनर शुल्क:' : 'Monthly Retainer Management:'}</span>
                  <span className="font-mono font-medium text-slate-900">
                    {formatINR(Math.round(calc.recurringMin + (calc.recurringMax - calc.recurringMin) * 0.4))} / mo
                  </span>
                </div>
              )}

              {calc.discountAmount > 0 && (
                <div className="flex justify-between py-1 text-emerald-700 font-medium">
                  <span>{isHi ? 'स्वीकृत डिस्काउंट:' : 'Authorized Discount Applied:'}</span>
                  <span className="font-mono">-{formatINR(calc.discountAmount)}</span>
                </div>
              )}

              {quote.state.applyGst && (
                <div className="flex justify-between py-1 text-slate-600 border-t border-slate-200">
                  <span>{isHi ? 'लागू GST (18%):' : 'Goods & Services Tax (GST 18%):'}</span>
                  <span className="font-mono font-medium text-slate-900">{formatINR(calc.gstAmount)}</span>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t-2 border-slate-300 font-heading font-bold text-base text-brand-navy-950">
                <span>{isHi ? 'कुल अनुमानित देय:' : 'Total Estimated Investment:'}</span>
                <span className="text-brand-electric-700 font-mono text-lg">{formatINR(calc.finalRecommendedTotal)}</span>
              </div>
              <p className="text-[10px] text-slate-400 text-right">
                {isHi ? 'लागू टैक्स सहित' : 'Inclusive of configured taxes'}
              </p>
            </div>
          </div>

          {/* Signatures & Acceptance */}
          <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12 text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-800">{isHi ? 'फ्यूचरिक्स की ओर से:' : 'For FUTUREIX Digital Services:'}</p>
              <div className="mt-8 pt-2 border-t border-slate-300 w-48 font-medium text-slate-800">
                Kartik Garhwal / Mritunjay Pratap
              </div>
              <p className="text-[10px] text-slate-400">{isHi ? 'अधिकृत हस्ताक्षरकर्ता' : 'Authorized Signatory'}</p>
            </div>

            <div>
              <p className="font-bold text-slate-800">{isHi ? 'ग्राहक की स्वीकृति:' : 'Client Acceptance & Authorization:'}</p>
              <div className="mt-8 pt-2 border-t border-slate-300 w-48 font-medium text-slate-800">
                {quote.customer.name}
              </div>
              <p className="text-[10px] text-slate-400">{isHi ? 'दिनांक व मुहर' : 'Date & Seal'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
