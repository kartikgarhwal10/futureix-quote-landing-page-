'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES } from '@/data/priceCatalogue';
import { formatINR } from '@/lib/utils';
import {
  Globe,
  ShoppingBag,
  Cpu,
  Smartphone,
  TrendingUp,
  Share2,
  MessageSquare,
  Bot,
  Search,
  Palette,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Sparkles,
} from 'lucide-react';

export default function ServicesIndexPage() {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5 text-brand-electric-400" />,
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-brand-electric-400" />,
    Cpu: <Cpu className="w-5 h-5 text-brand-electric-400" />,
    Smartphone: <Smartphone className="w-5 h-5 text-brand-electric-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-brand-electric-400" />,
    Share2: <Share2 className="w-5 h-5 text-brand-electric-400" />,
    MessageSquare: <MessageSquare className="w-5 h-5 text-brand-electric-400" />,
    Bot: <Bot className="w-5 h-5 text-brand-electric-400" />,
    Search: <Search className="w-5 h-5 text-brand-electric-400" />,
    Palette: <Palette className="w-5 h-5 text-brand-electric-400" />,
    Users: <Users className="w-5 h-5 text-brand-electric-400" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-brand-electric-400" />,
  };

  const filtered = SERVICE_CATEGORIES.filter((s) => {
    if (activeFilter === 'tech') return ['web_dev', 'ecommerce', 'web_apps', 'mobile_apps'].includes(s.id);
    if (activeFilter === 'marketing') return ['paid_ads', 'social_media', 'seo', 'branding'].includes(s.id);
    if (activeFilter === 'automation') return ['whatsapp_api', 'ai_automation', 'crm', 'analytics'].includes(s.id);
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
          <span>{language === 'hi' ? 'संपूर्ण सर्विस कैटलॉग' : 'All Digital Capabilities'}</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === 'hi'
            ? 'आधुनिक तकनीक व परफॉरमेंस मार्केटिंग सेवाएं'
            : 'Engineering, Marketing & AI Solutions'}
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          {language === 'hi'
            ? 'पारदर्शी मूल्य निर्धारण, स्पष्ट कार्य-दायरा और समर्पित तकनीकी विशेषज्ञता।'
            : 'Transparent price brackets, defined deliverables, and enterprise-grade execution.'}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी सेवाएं' : 'All Capabilities' },
            { id: 'tech', label: language === 'hi' ? 'वेबसाइट व ऍप्स' : 'Web & Mobile Tech' },
            { id: 'marketing', label: language === 'hi' ? 'मार्केटिंग व ऐड्स' : 'Performance Marketing' },
            { id: 'automation', label: language === 'hi' ? 'AI व ऑटोमेशन' : 'AI & Automations' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-brand-electric-600 text-white shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="glass-card rounded-2xl p-7 border border-white/10 hover:border-brand-electric-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-navy-800 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {iconMap[service.iconName] || <Globe className="w-5 h-5 text-brand-electric-400" />}
              </div>

              <h2 className="font-heading text-xl font-bold text-white mb-2">
                {language === 'hi' ? service.titleHi : service.titleEn}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {language === 'hi' ? service.descriptionHi : service.descriptionEn}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
                {(language === 'hi' ? service.highlightsHi : service.highlightsEn).slice(0, 3).map((hl, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric-400 mr-2 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  {language === 'hi' ? 'शुरुआती कीमत' : 'Starting at'}
                </span>
                <span className="font-mono text-base font-bold text-brand-gold-400">
                  {formatINR(service.startingPrice)}
                </span>
                {service.billingType === 'monthly' && (
                  <span className="text-[10px] text-slate-400 ml-1">/ mo</span>
                )}
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-brand-electric-600 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center group-hover:shadow-glow"
              >
                <span>{t('ctaViewDetails')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Estimation Callout Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-navy-950 border border-brand-electric-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-white">
            {language === 'hi' ? 'कस्टम प्रोजेक्ट की गणना करना चाहते हैं?' : 'Need a Multi-Service Custom Estimate?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {language === 'hi'
              ? 'हमारे इंटरएक्टिव कैलकुलेटर से एक साथ वेबसाइट, मोबाइल ऐप और विज्ञापन कैंपेन का संयुक्त बजट तैयार करें।'
              : 'Combine website development, mobile app platforms, WhatsApp automations, and ad campaigns into a single unified proposal.'}
          </p>
        </div>

        <Link
          href="/internal/pricing-calculator"
          className="px-6 py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center shrink-0"
        >
          <Calculator className="w-4 h-4 mr-2" />
          <span>{t('ctaCalculateProject')}</span>
        </Link>
      </div>
    </div>
  );
}
