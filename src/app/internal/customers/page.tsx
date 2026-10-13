'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InternalLayout } from '@/components/InternalLayout';
import { EnquiryRecord } from '@/lib/types';
import { INITIAL_ENQUIRIES, DEFAULT_SITE_SETTINGS } from '@/data/store';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  Users,
  Search,
  MessageSquare,
  Calculator,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export default function CustomersAndEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('futureix_enquiries');
    if (saved) {
      try {
        setEnquiries(JSON.parse(saved));
      } catch {
        setEnquiries(INITIAL_ENQUIRIES);
      }
    } else {
      setEnquiries(INITIAL_ENQUIRIES);
      localStorage.setItem('futureix_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
    }
  }, []);

  const handleStatusChange = (enqId: string, status: EnquiryRecord['status']) => {
    const updated = enquiries.map((e) => (e.id === enqId ? { ...e, status } : e));
    setEnquiries(updated);
    localStorage.setItem('futureix_enquiries', JSON.stringify(updated));
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.referenceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <InternalLayout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-brand-electric-400" />
              <h1 className="font-heading text-2xl font-bold text-white">
                Customer Inquiries & Leads Pipeline
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time inbound inquiries captured via website consultations and direct forms.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative text-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by customer name, brand, email, or reference code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnquiries.map((enq) => {
            const waMsg = `Hello ${enq.name}, this is Futureix regarding your inquiry (${enq.referenceId}) for ${enq.serviceCategory}.`;
            const waUrl = getWhatsAppUrl(enq.phone, waMsg);

            return (
              <div
                key={enq.id}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="font-mono text-[11px] font-bold text-brand-gold-400">
                      {enq.referenceId}
                    </span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer border ${
                        enq.status === 'new'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : enq.status === 'quoted'
                          ? 'bg-brand-electric-500/20 text-brand-electric-300 border-brand-electric-500/40'
                          : 'bg-white/10 text-slate-300 border-white/20'
                      }`}
                    >
                      <option value="new" className="bg-brand-navy-900 text-white">New</option>
                      <option value="contacted" className="bg-brand-navy-900 text-white">Contacted</option>
                      <option value="quoted" className="bg-brand-navy-900 text-white">Quoted</option>
                      <option value="closed" className="bg-brand-navy-900 text-white">Closed</option>
                    </select>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="font-heading font-bold text-white text-base">{enq.name}</h3>
                    {enq.businessName && (
                      <p className="text-xs font-medium text-brand-electric-300">{enq.businessName}</p>
                    )}
                    <p className="text-xs text-slate-400 flex items-center pt-1">
                      <Mail className="w-3 h-3 mr-1 text-slate-500" />
                      <span>{enq.email}</span>
                    </p>
                    <p className="text-xs text-slate-400 flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-slate-500" />
                      <span>{enq.phone}</span>
                    </p>
                    {enq.city && (
                      <p className="text-xs text-slate-400 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-slate-500" />
                        <span>{enq.city}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-brand-navy-950/70 border border-white/5 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Service:</span>
                      <strong className="text-white capitalize">{enq.serviceCategory.replace('_', ' ')}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Budget:</span>
                      <span className="font-mono text-brand-gold-400 font-bold">{enq.budgetRange}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Timeline:</span>
                      <span className="text-slate-300">{enq.timeline}</span>
                    </div>
                    {enq.description && (
                      <p className="text-[11px] text-slate-400 pt-2 border-t border-white/5 line-clamp-3">
                        &quot;{enq.description}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center space-x-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center transition-all shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href={`/internal/pricing-calculator`}
                    className="flex-1 py-2 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs flex items-center justify-center transition-all shadow-glow"
                  >
                    <Calculator className="w-3.5 h-3.5 mr-1.5" />
                    <span>Estimate</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InternalLayout>
  );
}
