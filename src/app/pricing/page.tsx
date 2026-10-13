'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FEATURED_PACKAGES } from '@/data/priceCatalogue';
import { formatINR } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function PricingPage() {
  const { language, t } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'one_time' | 'monthly'>('all');

  const filteredPackages = FEATURED_PACKAGES.filter((p) => {
    if (filterType === 'all') return true;
    return p.billingType === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'पारदर्शी मूल्य निर्धारण' : 'Transparent Package Catalog'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === 'hi' ? 'प्रोजेक्ट पैकेजेस व मूल्य संरचना' : 'Investment Packages & Scope Tiers'}
        </h1>

        <p className="text-sm sm:text-base text-slate-400">
          {language === 'hi'
            ? 'स्पष्ट परिणाम, पारदर्शी मूल्य और कोई छिपा हुआ शुल्क नहीं। अपनी आवश्यकता अनुसार पैकेज चुनें या कैलकुलेटर से कस्टमाइज करें।'
            : 'Pre-scoped implementation packages and ongoing growth retainers with zero hidden margins.'}
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-brand-electric-600 text-white shadow-glow'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {language === 'hi' ? 'सभी पैकेजेस' : 'All Packages'}
          </button>
          <button
            onClick={() => setFilterType('one_time')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'one_time'
                ? 'bg-brand-electric-600 text-white shadow-glow'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {language === 'hi' ? 'एकमुश्त निर्माण' : 'One-time Project Builds'}
          </button>
          <button
            onClick={() => setFilterType('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'monthly'
                ? 'bg-brand-electric-600 text-white shadow-glow'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {language === 'hi' ? 'मासिक रीटेनर' : 'Monthly Growth Retainers'}
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
              pkg.popular
                ? 'bg-brand-navy-900 border-2 border-brand-electric-500 shadow-glow'
                : 'glass-card border border-white/10'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-electric-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                {language === 'hi' ? 'अनुशंसित' : 'Recommended'}
              </div>
            )}

            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-heading text-xl font-bold text-white">
                  {language === 'hi' ? pkg.nameHi : pkg.nameEn}
                </h3>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-slate-400">
                  {pkg.billingType === 'monthly' ? 'Monthly' : 'One-time'}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">
                {language === 'hi' ? pkg.taglineHi : pkg.taglineEn}
              </p>

              <div className="my-6 p-4 rounded-xl bg-brand-navy-950/70 border border-white/5">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {formatINR(pkg.minPrice)}
                  <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                    – {formatINR(pkg.maxPrice)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  {pkg.billingType === 'monthly'
                    ? (language === 'hi' ? 'मासिक एजेंसी प्रबंधन शुल्क' : 'Monthly agency management fee')
                    : (language === 'hi' ? 'पूर्ण स्कोप एकमुश्त निर्माण' : 'Full-scope turn-key implementation')}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                <p className="font-semibold text-white text-[11px] uppercase tracking-wider">
                  {language === 'hi' ? 'शामिल विशेषताएं:' : 'Included In Scope:'}
                </p>
                {(language === 'hi' ? pkg.featuresHi : pkg.featuresEn).map((f, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric-400 mr-2 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400 mb-6">
                <span className="font-semibold text-slate-300 block">
                  {language === 'hi' ? 'उपयुक्त:' : 'Ideal For:'}
                </span>
                <p className="mt-0.5">{language === 'hi' ? pkg.idealForHi : pkg.idealForEn}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/contact"
                className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center transition-all ${
                  pkg.popular
                    ? 'bg-brand-electric-600 hover:bg-brand-electric-500 text-white shadow-glow'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {t('ctaConsultation')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Calculator CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-950 border border-brand-electric-500/30 text-center max-w-4xl mx-auto space-y-4 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-brand-electric-500/10 border border-brand-electric-500/20 flex items-center justify-center mx-auto text-brand-electric-400 shadow-glow">
          <Calculator className="w-6 h-6" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          {language === 'hi' ? 'अपनी मनपसंद सुविधाओं का एस्टीमेट तैयार करें' : 'Looking for a Bespoke Custom Configuration?'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {language === 'hi'
            ? 'हमारे इंटरेक्टिव कैलकुलेटर में जाएं और फीचर-दर-फीचर चयन करके तुरंत लाइव कोटेशन प्राप्त करें।'
            : 'Access our interactive engineering calculator to configure exact screen counts, payment gateways, live tracking, and integrations.'}
        </p>
        <div className="pt-2">
          <Link
            href="/internal/pricing-calculator"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all"
          >
            <Calculator className="w-4 h-4 mr-2" />
            <span>{t('ctaCalculateProject')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
