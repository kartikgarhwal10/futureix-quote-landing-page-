'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CASE_STUDIES } from '@/data/caseStudiesData';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Terminal, Layers } from 'lucide-react';

export default function PortfolioPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'सत्यापित प्रोजेक्ट्स' : 'Verified Engineering Engagements'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === 'hi' ? 'केस स्टडीज व तकनीकी कार्य' : 'Case Studies & Architectural Work'}
        </h1>

        <p className="text-sm sm:text-base text-slate-400">
          {language === 'hi'
            ? 'हम वास्तविक परिणाम, सटीक डिलीवरेबल्स और विश्वसनीय तकनीकी आर्किटेक्चर में विश्वास करते हैं। कोई बनावटी आंकड़े या अवास्तविक दावे नहीं।'
            : 'Detailed breakdowns of actual scope, technical architecture, and operational outcomes delivered across Indian businesses.'}
        </p>
      </div>

      {/* Case Studies Deep Dive List */}
      <div className="space-y-12">
        {CASE_STUDIES.map((cs, idx) => (
          <div
            key={cs.id}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8 shadow-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-electric-400 block mb-1">
                  CASE ENGAGEMENT 0{idx + 1} • {language === 'hi' ? cs.clientSectorHi : cs.clientSectorEn}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {language === 'hi' ? cs.titleHi : cs.titleEn}
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              {language === 'hi' ? cs.summaryHi : cs.summaryEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Deliverables */}
              <div className="p-6 rounded-2xl bg-brand-navy-950/70 border border-white/5 space-y-3 text-xs">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center text-brand-electric-400">
                  <Layers className="w-4 h-4 mr-1.5" />
                  <span>{language === 'hi' ? 'डिलीवर किए गए कार्य (Scope Deliverables):' : 'Engineered Deliverables:'}</span>
                </span>
                <ul className="space-y-2 text-slate-300">
                  {(language === 'hi' ? cs.deliverablesHi : cs.deliverablesEn).map((d, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric-400 mr-2 mt-1.5 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Outcomes */}
              <div className="p-6 rounded-2xl bg-brand-navy-950/70 border border-white/5 space-y-3 text-xs">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>{language === 'hi' ? 'सत्यापित परिणाम (Verified Outcomes):' : 'Verified Outcomes:'}</span>
                </span>
                <ul className="space-y-2 text-slate-300">
                  {(language === 'hi' ? cs.outcomesHi : cs.outcomesEn).map((o, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] mr-2 flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>Tech Stack:</span>
              </span>
              {cs.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-8 sm:p-10 rounded-2xl bg-brand-navy-900 border border-white/10 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="font-heading text-2xl font-bold text-white">
          {language === 'hi' ? 'क्या आप अपने बिज़नेस का डिजिटल ट्रांसफॉर्मेशन करना चाहते हैं?' : 'Ready to Engineer Your Digital Growth?'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          {language === 'hi'
            ? 'हमारे तकनीकी संस्थापकों के साथ सीधी बातचीत करें और अपने प्रोजेक्ट का सटीक खाका तैयार करें।'
            : 'Schedule a discovery session with our founding team to evaluate your project scope and architectural needs.'}
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all"
          >
            <span>{t('ctaConsultation')}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
