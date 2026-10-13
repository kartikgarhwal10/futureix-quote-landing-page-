'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { InternalLayout } from '@/components/InternalLayout';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { QuoteRecord } from '@/lib/types';
import { INITIAL_QUOTES } from '@/data/store';
import { formatINR } from '@/lib/utils';
import { QuotationModal } from '@/components/QuotationModal';
import {
  FileSpreadsheet,
  Printer,
  Copy,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

export default function QuotesListPage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeModalQuote, setActiveModalQuote] = useState<QuoteRecord | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('futureix_quotes');
    if (saved) {
      try {
        setQuotes(JSON.parse(saved));
      } catch {
        setQuotes(INITIAL_QUOTES);
      }
    } else {
      setQuotes(INITIAL_QUOTES);
      localStorage.setItem('futureix_quotes', JSON.stringify(INITIAL_QUOTES));
    }
  }, []);

  const handleStatusChange = (quoteId: string, newStatus: QuoteRecord['status']) => {
    const updated = quotes.map((q) => {
      if (q.id === quoteId) {
        return { ...q, status: newStatus };
      }
      return q;
    });
    setQuotes(updated);
    localStorage.setItem('futureix_quotes', JSON.stringify(updated));
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <InternalLayout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-brand-gold-400" />
              <h1 className="font-heading text-2xl font-bold text-white">
                Saved Commercial Quotations
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Historical quotation snapshots, proposal versions, and client approval tracking.
            </p>
          </div>

          <Link
            href="/internal/pricing-calculator"
            className="px-4 py-2.5 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>New Custom Estimate</span>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Quote #, Customer, or Project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-brand-electric-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white outline-none focus:border-brand-electric-400"
          >
            <option value="all">All Statuses ({quotes.length})</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected / Expired</option>
          </select>
        </div>

        {/* Quotes List Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-brand-navy-950/80 text-slate-400 border-b border-white/10">
                  <th className="py-3 px-4">Quote # & Date</th>
                  <th className="py-3 px-4">Customer & Company</th>
                  <th className="py-3 px-4">Project Scope</th>
                  <th className="py-3 px-4 text-right">Estimated Investment</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-white text-xs block">
                        {q.quoteNumber}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(q.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-white">{q.customer.company || q.customer.name}</p>
                      <p className="text-[11px] text-slate-400">{q.customer.email}</p>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <p className="font-medium truncate max-w-xs">{q.projectName}</p>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {q.state.selectedCategoryIds.join(', ').replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-gold-400">
                      {formatINR(q.calculation?.finalRecommendedTotal || 0)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer border ${
                          q.status === 'sent'
                            ? 'bg-brand-electric-500/20 text-brand-electric-300 border-brand-electric-500/40'
                            : q.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : q.status === 'draft'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        <option value="draft" className="bg-brand-navy-900 text-white">Draft</option>
                        <option value="sent" className="bg-brand-navy-900 text-white">Sent</option>
                        <option value="approved" className="bg-brand-navy-900 text-white">Approved</option>
                        <option value="rejected" className="bg-brand-navy-900 text-white">Rejected</option>
                        <option value="expired" className="bg-brand-navy-900 text-white">Expired</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveModalQuote(q)}
                        className="px-3 py-1.5 rounded-lg bg-brand-electric-600/80 hover:bg-brand-electric-500 text-white text-xs font-semibold shadow-sm inline-flex items-center"
                      >
                        <Printer className="w-3 h-3 mr-1" />
                        <span>Proposal (PDF)</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {activeModalQuote && (
        <QuotationModal
          quote={activeModalQuote}
          onClose={() => setActiveModalQuote(null)}
        />
      )}
    </InternalLayout>
  );
}
