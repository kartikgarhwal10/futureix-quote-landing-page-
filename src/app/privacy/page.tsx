'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'कानूनी नीति' : 'Legal Compliance'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          {language === 'hi' ? 'प्राइवेसी पॉलिसी (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: October 13, 2026 • Futureix Digital Services ({DEFAULT_SITE_SETTINGS.website})
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            When you submit an enquiry, request a proposal, or schedule a technical consultation with Futureix, we collect business contact details such as your name, corporate email address, telephone/WhatsApp number, city, and high-level project specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-base font-bold text-white">2. How We Use Collected Information</h2>
          <p>
            We use your data solely to prepare commercial quotations, coordinate technical discovery calls, deliver requested proposals, and configure agreed digital deliverables. We do not sell, rent, or lease customer data to third-party data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-base font-bold text-white">3. Third-Party Integrations & Advertising Platforms</h2>
          <p>
            When managing Meta Ads, Google Ads, or WhatsApp Cloud API systems on behalf of authorized clients, all campaign data and audience assets reside securely within client-owned or authorized agency manager portfolios. We strictly uphold platform confidentiality and data isolation standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-base font-bold text-white">4. Data Security & Storage</h2>
          <p>
            We implement industry-standard encryption, server authentication, and restricted access controls to safeguard all customer inquiry and project data stored within our systems.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-base font-bold text-white">5. Contact Information</h2>
          <p>
            For any privacy inquiries or to request data removal, please contact our data grievance officer at{' '}
            <a href={`mailto:${DEFAULT_SITE_SETTINGS.primaryEmail}`} className="text-brand-electric-400 hover:underline">
              {DEFAULT_SITE_SETTINGS.primaryEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
