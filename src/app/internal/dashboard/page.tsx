'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { InternalLayout } from '@/components/InternalLayout';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { QuoteRecord, EnquiryRecord } from '@/lib/types';
import { INITIAL_QUOTES, INITIAL_ENQUIRIES } from '@/data/store';
import { formatINR } from '@/lib/utils';
import {
  FileSpreadsheet,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);

  useEffect(() => {
    // Load from client storage or initialize with authentic seeds
    const savedQuotes = localStorage.getItem('futureix_quotes');
    if (savedQuotes) {
      try {
        setQuotes(JSON.parse(savedQuotes));
      } catch {
        setQuotes(INITIAL_QUOTES);
      }
    } else {
      setQuotes(INITIAL_QUOTES);
      localStorage.setItem('futureix_quotes', JSON.stringify(INITIAL_QUOTES));
    }

    const savedEnquiries = localStorage.getItem('futureix_enquiries');
    if (savedEnquiries) {
      try {
        setEnquiries(JSON.parse(savedEnquiries));
      } catch {
        setEnquiries(INITIAL_ENQUIRIES);
      }
    } else {
      setEnquiries(INITIAL_ENQUIRIES);
      localStorage.setItem('futureix_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
    }
  }, []);

  // Compute metrics strictly from stored data
  const metrics = React.useMemo(() => {
    const totalQuotes = quotes.length;
    const draftQuotes = quotes.filter((q) => q.status === 'draft').length;
    const sentQuotes = quotes.filter((q) => q.status === 'sent').length;
    const approvedQuotes = quotes.filter((q) => q.status === 'approved').length;
    const rejectedQuotes = quotes.filter((q) => q.status === 'rejected' || q.status === 'expired').length;

    // Pipeline value is the sum of recommended totals of sent & draft quotes
    const pipelineValue = quotes
      .filter((q) => q.status === 'sent' || q.status === 'draft')
      .reduce((acc, q) => acc + (q.calculation?.finalRecommendedTotal || 0), 0);

    return {
      totalQuotes,
      draftQuotes,
      sentQuotes,
      approvedQuotes,
      rejectedQuotes,
      pipelineValue,
    };
  }, [quotes]);

  return (
    <InternalLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-400 block mb-1">
              Active Session
            </span>
            <h1 className="font-heading text-2xl font-bold text-white">
              Welcome back, {user?.name || 'Estimator'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Futureix Commercial Estimation & Pipeline Control Center
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/internal/pricing-calculator"
              className="px-4 py-2.5 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center"
            >
              <Calculator className="w-3.5 h-3.5 mr-1.5" />
              <span>Create New Estimate</span>
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Total Quotes</span>
            <div className="font-heading text-2xl font-bold text-white">{metrics.totalQuotes}</div>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Draft Quotes</span>
            <div className="font-heading text-2xl font-bold text-amber-400">{metrics.draftQuotes}</div>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Proposals Sent</span>
            <div className="font-heading text-2xl font-bold text-brand-electric-400">{metrics.sentQuotes}</div>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Approved</span>
            <div className="font-heading text-2xl font-bold text-emerald-400">{metrics.approvedQuotes}</div>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Expired / Reject</span>
            <div className="font-heading text-2xl font-bold text-slate-500">{metrics.rejectedQuotes}</div>
          </div>

          <div className="p-4 rounded-xl bg-brand-navy-900/60 border border-brand-electric-500/20 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-brand-gold-400 block font-semibold">
              Pipeline Value
            </span>
            <div className="font-heading text-xl font-bold text-brand-gold-400 font-mono">
              {formatINR(metrics.pipelineValue)}
            </div>
          </div>
        </div>

        {/* Recent Activity: Quotes and Inbound Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Enquiries */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-brand-electric-400" />
                <h3 className="font-heading font-bold text-white text-sm">
                  {t('recentEnquiriesTitle')}
                </h3>
              </div>
              <Link
                href="/internal/customers"
                className="text-xs text-brand-electric-400 hover:text-brand-electric-300 font-medium flex items-center"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-brand-navy-950/60 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{enq.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">({enq.referenceId})</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{enq.businessName || enq.city}</p>
                    <p className="text-[10px] text-brand-gold-400 font-mono">{enq.budgetRange}</p>
                  </div>

                  <div className="text-right space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        enq.status === 'new'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {enq.status}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quotations */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-brand-gold-400" />
                <h3 className="font-heading font-bold text-white text-sm">
                  {t('recentQuotesTitle')}
                </h3>
              </div>
              <Link
                href="/internal/quotes"
                className="text-xs text-brand-electric-400 hover:text-brand-electric-300 font-medium flex items-center"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {quotes.slice(0, 4).map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-brand-navy-950/60 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white font-mono">{q.quoteNumber}</span>
                      <span className="text-[10px] text-slate-400">({q.customer.company || q.customer.name})</span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate max-w-[200px]">{q.projectName}</p>
                    <p className="text-[11px] text-brand-gold-400 font-mono font-bold">
                      {formatINR(q.calculation?.finalRecommendedTotal || 0)}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        q.status === 'sent'
                          ? 'bg-brand-electric-500/20 text-brand-electric-300'
                          : q.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {q.status}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {new Date(q.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InternalLayout>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
