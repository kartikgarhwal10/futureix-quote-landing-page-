'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES, FEATURED_PACKAGES } from '@/data/priceCatalogue';
import { CASE_STUDIES } from '@/data/caseStudiesData';
import { LeadForm } from '@/components/LeadForm';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import {
  ArrowRight,
  Sparkles,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Globe,
  ShoppingBag,
  Smartphone,
  Share2,
  MessageSquare,
  Bot,
  Search,
  Palette,
  Users,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  Layers,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-brand-electric-400" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-brand-electric-400" />,
    Cpu: <Cpu className="w-6 h-6 text-brand-electric-400" />,
    Smartphone: <Smartphone className="w-6 h-6 text-brand-electric-400" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-brand-electric-400" />,
    Share2: <Share2 className="w-6 h-6 text-brand-electric-400" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-brand-electric-400" />,
    Bot: <Bot className="w-6 h-6 text-brand-electric-400" />,
    Search: <Search className="w-6 h-6 text-brand-electric-400" />,
    Palette: <Palette className="w-6 h-6 text-brand-electric-400" />,
    Users: <Users className="w-6 h-6 text-brand-electric-400" />,
    BarChart3: <BarChart3 className="w-6 h-6 text-brand-electric-400" />,
  };

  const industries = [
    { title: t('indRetail'), desc: language === 'hi' ? 'कस्टम ई-कॉमर्स व D2C ग्रोथ' : 'Custom e-commerce & D2C growth' },
    { title: t('indRealEstate'), desc: language === 'hi' ? 'हाई-कन्वर्जन लीड फनल' : 'High-intent buyer lead funnels' },
    { title: t('indHealthcare'), desc: language === 'hi' ? 'क्लिनिक अपॉइंटमेंट व WhatsApp बॉट्स' : 'Clinic booking & WhatsApp bots' },
    { title: t('indEducation'), desc: language === 'hi' ? 'LMS और छात्र एनरोलमेंट ऑटोमेशन' : 'LMS & student admission workflows' },
    { title: t('indHospitality'), desc: language === 'hi' ? 'डायरेक्ट बुकिंग व मेन्यू पोर्टल्स' : 'Direct booking & menu portals' },
    { title: t('indServices'), desc: language === 'hi' ? 'अथॉरिटी वेबसाइट्स व CRM सेटअप' : 'Authority websites & CRM setup' },
    { title: t('indStartups'), desc: language === 'hi' ? 'SaaS MVP व फुल-स्टैक इंजीनियरिंग' : 'SaaS MVPs & full-stack builds' },
    { title: t('indLocal'), desc: language === 'hi' ? 'गूगल मैप्स व लोकल SEO डॉमिनेंस' : 'Google Maps & local search' },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden bg-gradient-to-b from-brand-navy-950 via-brand-navy-900 to-[#030A16]">
        {/* Subtle background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-electric-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-gold-400 animate-pulse" />
            <span className="tracking-wide">{t('heroBadge')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-electric-600 to-brand-electric-500 hover:from-brand-electric-500 hover:to-brand-electric-400 text-white font-semibold text-sm transition-all shadow-glow hover:scale-105 active:scale-95 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2 text-brand-gold-300" />
              <span>{t('heroPrimaryCta')}</span>
            </Link>

            <Link
              href="/services"
              className="px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center"
            >
              <span>{t('heroSecondaryCta')}</span>
              <ArrowRight className="w-4 h-4 ml-2 text-brand-electric-400" />
            </Link>

            <Link
              href="/internal/pricing-calculator"
              className="px-6 py-3.5 rounded-xl bg-brand-navy-800/90 hover:bg-brand-navy-700 border border-brand-electric-500/30 text-brand-gold-400 font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center shadow-sm"
            >
              <Calculator className="w-4 h-4 mr-2" />
              <span>{t('heroCalculatorCta')}</span>
            </Link>
          </div>

          {/* Hero Meta Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-white">{t('stat1Number')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('stat1Label')}</p>
            </div>
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-brand-electric-400">{t('stat2Number')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('stat2Label')}</p>
            </div>
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-brand-gold-400">{t('stat3Number')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('stat3Label')}</p>
            </div>
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400">{t('stat4Number')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('stat4Label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-electric-400 mb-2">
              {language === 'hi' ? 'हमारी मुख्य सेवाएं' : 'Specialized Capabilities'}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {language === 'hi' ? 'पारदर्शी मूल्य और सिद्ध परिणाम' : 'Engineered for Digital Dominance'}
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 text-sm font-semibold text-brand-electric-400 hover:text-brand-electric-300 flex items-center group"
          >
            <span>{language === 'hi' ? 'सभी 12+ सेवाएं देखें' : 'Explore All 12+ Capabilities'}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-7 border border-white/10 hover:border-brand-electric-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-navy-800 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {iconMap[service.iconName] || <Globe className="w-6 h-6 text-brand-electric-400" />}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {language === 'hi' ? service.titleHi : service.titleEn}
                </h3>

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
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 group-hover:text-white group-hover:bg-brand-electric-600 transition-all"
                >
                  {t('ctaViewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE ESTIMATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-950 border border-brand-electric-500/30 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-electric-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-400 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सटीक फीचर कैलकुलेटर' : 'Live Calculation Engine'}</span>
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              {language === 'hi'
                ? 'अपने प्रोजेक्ट की वास्तविक कीमत और समय-सीमा तुरंत जानें'
                : 'Need a customized quotation before speaking with our team?'}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'हमारे इंटरएक्टिव कैलकुलेटर से अपनी आवश्यकतानुसार पेजेस, स्क्रीन्स, इंटीग्रेशन और फीचर्स चुनकर वास्तविक पारदर्शी अनुमान तैयार करें।'
                : 'Select your exact platforms, page counts, API integrations, and features to calculate an itemized estimate with delivery milestones.'}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/internal/pricing-calculator"
                className="px-6 py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-sm shadow-glow transition-all flex items-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                <span>{t('ctaCalculateProject')}</span>
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-sm transition-all"
              >
                {t('navPricing')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRICING PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400 mb-2">
            {language === 'hi' ? 'मानक पैकेज' : 'Pre-Engineered Packages'}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {language === 'hi' ? 'स्पष्ट मूल्य • कोई छिपा हुआ शुल्क नहीं' : 'Transparent Investment Packages'}
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            {language === 'hi'
              ? 'प्रारंभिक व्यवसायों से लेकर एंटरप्राइज़ ब्रांड्स तक के लिए स्पष्ट रूप से परिभाषित कार्य-दायरा।'
              : 'Defined scopes with transparent starting & typical ranges tailored for fast turnaround.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PACKAGES.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-brand-navy-900 border-2 border-brand-electric-500 shadow-glow'
                  : 'glass-card border border-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-electric-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {language === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}
                </div>
              )}

              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {language === 'hi' ? pkg.nameHi : pkg.nameEn}
                </h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[36px]">
                  {language === 'hi' ? pkg.taglineHi : pkg.taglineEn}
                </p>

                <div className="my-6 p-4 rounded-xl bg-brand-navy-950/60 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {formatINR(pkg.minPrice)}
                    <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                      – {formatINR(pkg.maxPrice)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {pkg.billingType === 'monthly'
                      ? (language === 'hi' ? 'मासिक रीटेनर' : 'Monthly retainer fee')
                      : (language === 'hi' ? 'एकमुश्त प्रोजेक्ट स्कोप' : 'One-time project build')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 mb-8">
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
              </div>

              <div className="pt-4 border-t border-white/10">
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
      </section>

      {/* 5. PROCESS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-electric-400 mb-2">
            {language === 'hi' ? 'कार्यप्रणाली' : 'Structured Execution'}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('processTitle')}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t('processSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { title: t('step1Title'), desc: t('step1Desc') },
            { title: t('step2Title'), desc: t('step2Desc') },
            { title: t('step3Title'), desc: t('step3Desc') },
            { title: t('step4Title'), desc: t('step4Desc') },
            { title: t('step5Title'), desc: t('step5Desc') },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-brand-navy-900/60 border border-white/5 hover:border-brand-electric-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-brand-gold-400">
                  PHASE 0{idx + 1}
                </span>
                <h3 className="font-heading font-bold text-white text-base mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              {language === 'hi' ? 'सत्यापित कार्य' : 'Verified Case Studies'}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {language === 'hi' ? 'वास्तविक तकनीकी समाधान' : 'Authentic Client Engagements'}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 text-sm font-semibold text-brand-electric-400 hover:text-brand-electric-300 flex items-center group"
          >
            <span>{language === 'hi' ? 'सभी केस स्टडीज देखें' : 'View Full Case Archive'}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="p-7 rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-electric-400 block mb-2">
                  {language === 'hi' ? cs.clientSectorHi : cs.clientSectorEn}
                </span>
                <h3 className="font-heading text-lg font-bold text-white mb-3">
                  {language === 'hi' ? cs.titleHi : cs.titleEn}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {language === 'hi' ? cs.summaryHi : cs.summaryEn}
                </p>

                {/* Outcomes */}
                <div className="space-y-1.5 text-xs text-slate-400 mb-6 bg-brand-navy-950/40 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] font-semibold text-slate-300 block mb-1">
                    {language === 'hi' ? 'मुख्य उपलब्धियां:' : 'Verified Outcomes:'}
                  </span>
                  {(language === 'hi' ? cs.outcomesHi : cs.outcomesEn).slice(0, 2).map((oc, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                      <span>{oc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {cs.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400 mb-2">
            {language === 'hi' ? 'उद्योग' : 'Target Sectors'}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('industriesTitle')}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t('industriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-brand-navy-900/40 border border-white/5 hover:border-brand-electric-500/30 transition-all text-center"
            >
              <h4 className="font-heading font-bold text-white text-sm">{ind.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LEAD CAPTURE & CONSULTATION FORM */}
      <section id="consultation" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadForm />
      </section>
    </div>
  );
}
