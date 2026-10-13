'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES, MASTER_PRICING_ITEMS } from '@/data/priceCatalogue';
import { formatINR } from '@/lib/utils';
import { LeadForm } from '@/components/LeadForm';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Calculator,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();

  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-heading text-3xl font-bold text-white">Service Not Found</h1>
        <p className="text-slate-400 text-sm">The requested capability is not in our active catalogue.</p>
        <Link
          href="/services"
          className="inline-block px-5 py-2.5 rounded-xl bg-brand-electric-600 text-white text-xs font-semibold"
        >
          View All Services
        </Link>
      </div>
    );
  }

  // Get line items belonging to this category
  const categoryItems = MASTER_PRICING_ITEMS.filter((i) => i.categoryId === service.id && i.active);

  // Dynamic button labels based on category
  const getCalculateButtonLabel = () => {
    if (service.id === 'web_dev') return t('ctaCalculateWebsite');
    if (service.id === 'mobile_apps') return t('ctaBuildAppEstimate');
    return t('ctaCalculateProject');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/services" className="hover:text-white transition-colors">
          Services
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-brand-electric-400 font-medium">
          {language === 'hi' ? service.titleHi : service.titleEn}
        </span>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
            <span>{language === 'hi' ? 'विशेषज्ञ सेवा' : 'Dedicated Discipline'}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'hi' ? service.titleHi : service.titleEn}
          </h1>

          <p className="text-base text-brand-electric-300 font-medium">
            {language === 'hi' ? service.taglineHi : service.taglineEn}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            {language === 'hi' ? service.descriptionHi : service.descriptionEn}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/internal/pricing-calculator"
              className="px-6 py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              <span>{getCalculateButtonLabel()}</span>
            </Link>

            <a
              href="#consultation"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-all flex items-center"
            >
              <span>{t('ctaConsultation')}</span>
            </a>
          </div>
        </div>

        {/* Pricing Summary Card */}
        <div className="glass-panel p-7 rounded-2xl border border-brand-electric-500/30 space-y-5 shadow-card">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
            {language === 'hi' ? 'लागत व समय-सीमा' : 'Indicative Pricing & Delivery'}
          </span>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">{language === 'hi' ? 'शुरुआती कीमत:' : 'Starting at:'}</span>
            <div className="text-3xl font-extrabold font-mono text-brand-gold-400">
              {formatINR(service.startingPrice)}
              {service.billingType === 'monthly' && (
                <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ month</span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-navy-950/80 border border-white/5 space-y-1 text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {language === 'hi' ? 'सामान्य प्रोजेक्ट सीमा:' : 'Typical Project Range:'}
            </span>
            <div className="font-mono font-bold text-white text-base">
              {formatINR(service.startingPrice)} – {formatINR(service.typicalMaxPrice)}
              {service.billingType === 'monthly' && ' / mo'}
            </div>
          </div>

          <div className="flex items-center text-xs text-slate-300">
            <Clock className="w-4 h-4 mr-2 text-brand-electric-400 shrink-0" />
            <span>
              {language === 'hi' ? 'डिलीवरी समय:' : 'Typical Timeline:'}{' '}
              <strong className="text-white">
                {language === 'hi' ? service.typicalTimelineHi : service.typicalTimelineEn}
              </strong>
            </span>
          </div>

          <p className="text-[10px] text-slate-500 leading-snug pt-2 border-t border-white/5">
            {t('disclaimerPricing')}
          </p>
        </div>
      </div>

      {/* Scope Inclusions vs Exclusions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/20 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-heading font-bold text-white text-lg">
              {language === 'hi' ? 'पैकेज में क्या शामिल है' : "What's Included in Scope"}
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            {(language === 'hi' ? service.includedHi : service.includedEn).map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What costs extra / excluded */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <XCircle className="w-5 h-5" />
            <h3 className="font-heading font-bold text-white text-lg">
              {language === 'hi' ? 'क्या शामिल नहीं है / अतिरिक्त शुल्क' : 'What Costs Extra / Direct Pass-through'}
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            {(language === 'hi' ? service.excludedHi : service.excludedEn).map((item, idx) => (
              <li key={idx} className="flex items-start">
                <XCircle className="w-4 h-4 mr-2 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Catalogue Variations for this category */}
      {categoryItems.length > 0 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {language === 'hi' ? 'उपलब्ध प्रोजेक्ट विकल्प व मूल्य' : 'Available Project Configurations'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi'
                ? 'प्रत्येक प्रोजेक्ट की विशिष्ट जरूरतों के अनुसार निर्धारित मूल्य श्रेणियां।'
                : 'Itemized options available for direct inclusion in your quotation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-brand-navy-950/60 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-heading font-bold text-white text-sm mb-1">
                    {language === 'hi' ? item.nameHi : item.nameEn}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {language === 'hi' ? item.descriptionHi : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-gold-400">
                    {formatINR(item.minPrice)} – {formatINR(item.maxPrice)}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{item.billingType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Lead Capture Section */}
      <div id="consultation" className="pt-8 max-w-4xl mx-auto">
        <LeadForm initialServiceId={service.id} />
      </div>
    </div>
  );
}
