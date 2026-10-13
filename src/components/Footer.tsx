'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES } from '@/data/priceCatalogue';
import { Sparkles, MessageSquare, ArrowUpRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-brand-navy-950 text-slate-400 border-t border-white/10 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-electric-500 to-brand-navy-800 border border-brand-electric-400/30 flex items-center justify-center shadow-glow">
                <span className="font-heading font-extrabold text-white text-base">F</span>
              </div>
              <span className="font-heading font-black tracking-tight text-white text-xl">
                FUTURE<span className="text-brand-electric-400">IX</span>
              </span>
            </Link>

            <p className="text-sm font-medium text-slate-300">
              {t('tagline')}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'हम भारतीय व्यवसायों और वैश्विक ब्रांड्स के लिए उच्च-प्रदर्शन डिजिटल अनुभव, प्रदर्शनकारी मार्केटिंग और कस्टम AI सिस्टम का निर्माण करते हैं।'
                : 'Engineering high-performance digital experiences, ROAS-driven performance marketing systems, and bespoke AI automations for ambitious businesses.'}
            </p>

            <div className="pt-2 text-xs text-brand-gold-400/90 font-medium border-l-2 border-brand-gold-500 pl-3">
              <p>{t('founderLabel')}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">{DEFAULT_SITE_SETTINGS.address}</p>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t('navServices')}
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-brand-electric-400 transition-colors flex items-center group"
                  >
                    <span>{language === 'hi' ? service.titleHi : service.titleEn}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-brand-electric-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Solutions Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'विशेषज्ञ सोल्यूशन्स' : 'Specialized Tech'}
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICE_CATEGORIES.slice(6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-brand-electric-400 transition-colors flex items-center group"
                  >
                    <span>{language === 'hi' ? service.titleHi : service.titleEn}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-brand-electric-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Portal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Company & Portal'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  {t('navPricing')}
                </Link>
              </li>
              <li>
                <Link href="/internal/pricing-calculator" className="hover:text-white transition-colors text-brand-gold-400 font-medium">
                  {t('navCalculator')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  {t('navPortfolio')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('navContact')}
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  {t('navFaqs')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {language === 'hi' ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {language === 'hi' ? 'नियम व शर्तें एवं रिफंड' : 'Terms & Refund Policy'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Transparent Pricing Disclaimer (Mandatory from prompt) */}
        <div className="py-6 border-b border-white/5 text-[11px] text-slate-400/90 leading-relaxed bg-brand-navy-900/40 rounded-xl px-4 my-6">
          <p className="flex items-start">
            <span className="inline-block text-brand-gold-400 font-semibold mr-2 shrink-0">
              {language === 'hi' ? 'महत्वपूर्ण मूल्य सूचना:' : 'Notice on Estimates:'}
            </span>
            <span>{t('disclaimerPricing')}</span>
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FUTUREIX ({DEFAULT_SITE_SETTINGS.website}). {t('allRightsReserved')}
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="text-slate-400">Jaipur • New Delhi • Pan-India</span>
            <span className="text-slate-600">|</span>
            <Link href="/internal/login" className="hover:text-slate-300 transition-colors">
              Staff Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
