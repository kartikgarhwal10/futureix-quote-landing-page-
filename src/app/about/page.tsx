'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import {
  Sparkles,
  ShieldCheck,
  Code2,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Users,
  Compass,
} from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
          <span>{language === 'hi' ? 'कंपनी परिचय' : 'About FUTUREIX'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === 'hi'
            ? 'हमारा विज़न: डिजिटल तकनीक और सशक्त विकास'
            : 'Engineering Digital Dominance for Ambitious Businesses'}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {language === 'hi'
            ? 'फ्यूचरिक्स एक भारतीय डिजिटल ग्रोथ, मार्केटिंग और टेक्नोलॉजी एजेंसी है जो AI, हाई-परफॉरमेंस वेब इंजीनियरिंग और सटीक विज्ञापन प्रणालियों के संगम पर कार्य करती है।'
            : 'FUTUREIX is an Indian technology, performance marketing, and digital growth agency founded to provide transparent, high-velocity engineering and marketing systems.'}
        </p>
      </div>

      {/* Leadership Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-wider text-brand-gold-400 font-bold block mb-1">
            {language === 'hi' ? 'नेतृत्व' : 'Founding Leadership'}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {language === 'hi' ? 'संस्थापक और दृष्टिकोण' : 'The People Behind Futureix'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Kartik Garhwal */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-electric-500 to-brand-navy-800 flex items-center justify-center font-heading font-black text-white text-xl shadow-glow">
              KG
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Kartik Garhwal</h3>
              <p className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wider mt-0.5">
                {language === 'hi' ? 'संस्थापक (Founder)' : 'Founder'}
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'तकनीकी आर्किटेक्चर, AI वर्कफ़्लो ऑटोमेशन और फुल-स्टैक सिस्टम इंजीनियरिंग के विशेषज्ञ। भारतीय व्यवसायों को आधुनिक डिजिटल क्षमताओं से लैस करने के प्रति समर्पित।'
                : 'Spearheads technical architecture, generative AI workflows, and bespoke web platforms. Focused on high-resilience engineering with clean code standards.'}
            </p>
          </div>

          {/* Mritunjay Pratap Singh */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-navy-700 to-brand-electric-600 flex items-center justify-center font-heading font-black text-white text-xl shadow-glow">
              MP
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Mritunjay Pratap Singh</h3>
              <p className="text-xs font-semibold text-brand-electric-400 uppercase tracking-wider mt-0.5">
                {language === 'hi' ? 'सह-संस्थापक (Co-founder)' : 'Co-founder'}
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'परफॉरमेंस मार्केटिंग, फुल-फनल पेड एडवरटाइजिंग (मेटा व गूगल ऐड्स) और बिज़नेस ग्रोथ रणनीतियों के विशेषज्ञ। वास्तविक ROI और कन्वर्जन पर केंद्रित।'
                : 'Directs paid acquisition, conversion-rate optimization (CRO), and client growth strategy. Specializes in ROAS-driven performance campaigns and sales pipelines.'}
            </p>
          </div>
        </div>
      </div>

      {/* Core Agency Values */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {language === 'hi' ? 'हमारे मुख्य सिद्धांत' : 'Our Engineering Philosophy'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'hi'
              ? 'हम क्यों अलग हैं और किन सिद्धांतों पर कार्य करते हैं'
              : 'The principles that guide our code, client deliverables, and commercial transparent pricing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-brand-navy-950/70 border border-white/5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">
              {language === 'hi' ? '1. नो-टेम्पलेट, शुद्ध कोड' : '1. Zero Generic Templates'}
            </h4>
            <p className="text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'हम धीमी गति वाले भारी टेम्प्लेट्स की जगह आवश्यकतानुसार कस्टमाइज्ड और ऑप्टिमाइज़्ड कोड का निर्माण करते हैं।'
                : 'Every line of code and UI component is intentionally engineered for performance, responsive fidelity, and Core Web Vitals.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy-950/70 border border-white/5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">
              {language === 'hi' ? '2. पूर्ण पारदर्शिता' : '2. Radically Transparent Pricing'}
            </h4>
            <p className="text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'हम क्लाइंट्स को बिना किसी छिपे हुए शुल्क के स्पष्ट शुरुआती व अधिकतम सीमाएं और मदवार ब्रेकडाउन प्रदान करते हैं।'
                : 'No mystery markups or arbitrary quotes. Every proposal provides itemized feature costs, exclusions, and milestone payment schedules.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy-950/70 border border-white/5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">
              {language === 'hi' ? '3. कोई झूठे वादे नहीं' : '3. Ethical Advertising Standards'}
            </h4>
            <p className="text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'हम गूगल #1 रैंक या गारंटीड बिक्री के अनैतिक दावे कभी नहीं करते। हम केवल सिद्ध रणनीतियों और पारदर्शी डेटा पर भरोसा करते हैं।'
                : 'We strictly never promise unrealistic guaranteed sales or search rankings. We run rigorous testing, server-side attribution, and continuous optimization.'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <Link
          href="/contact"
          className="inline-flex items-center px-7 py-3.5 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all"
        >
          <span>{t('ctaConsultation')}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
