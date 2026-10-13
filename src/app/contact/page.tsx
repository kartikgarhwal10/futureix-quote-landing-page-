'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LeadForm } from '@/components/LeadForm';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();

  const waMessage = 'Hello Futureix, I would like to schedule a project consultation with your technical strategy team.';
  const waUrl = getWhatsAppUrl(DEFAULT_SITE_SETTINGS.whatsappNumber, waMessage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
          <span>{language === 'hi' ? 'सीधा संपर्क' : 'Direct Agency Contact'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === 'hi'
            ? 'आइए अपने अगले प्रोजेक्ट की शुरुआत करें'
            : "Let's Engineer Your Next Digital Milestone"}
        </h1>

        <p className="text-sm sm:text-base text-slate-400">
          {language === 'hi'
            ? 'अपनी जरूरतें साझा करें और 24 घंटे के भीतर विस्तृत तकनीकी रोडमैप और पारदर्शी अनुमान प्राप्त करें।'
            : 'Share your requirements below or message our founding team directly on WhatsApp for an immediate response.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Sidebar (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 space-y-6 shadow-card">
            <h3 className="font-heading text-lg font-bold text-white flex items-center">
              <Building className="w-4 h-4 mr-2 text-brand-electric-400" />
              <span>Futureix Headquarters</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-electric-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Registered Office</strong>
                  <p className="text-slate-400 mt-0.5">{DEFAULT_SITE_SETTINGS.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-electric-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Email</strong>
                  <a
                    href={`mailto:${DEFAULT_SITE_SETTINGS.primaryEmail}`}
                    className="text-brand-electric-400 hover:underline"
                  >
                    {DEFAULT_SITE_SETTINGS.primaryEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-electric-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Telephone</strong>
                  <p className="text-slate-400">{DEFAULT_SITE_SETTINGS.primaryPhone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-electric-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Working Hours</strong>
                  <p className="text-slate-400">Monday – Saturday: 9:30 AM to 7:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                Instant Messaging Response:
              </span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-glow flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('ctaChatWhatsApp')}</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-navy-950/70 border border-white/5 text-xs text-slate-400 space-y-2">
            <span className="font-semibold text-brand-gold-400 block">Leadership Contacts:</span>
            <p>
              Founder: <strong className="text-white">Kartik Garhwal</strong>
            </p>
            <p>
              Co-founder: <strong className="text-white">Mritunjay Pratap Singh</strong>
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-white/5">
              Serving pan-India clients across Jaipur, Bengaluru, Delhi NCR, Mumbai & globally.
            </p>
          </div>
        </div>

        {/* Lead Form (2 cols) */}
        <div className="lg:col-span-2">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
