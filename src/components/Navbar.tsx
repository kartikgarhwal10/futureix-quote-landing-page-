'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  Menu,
  X,
  Languages,
  Calculator,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/services', label: t('navServices') },
    { href: '/pricing', label: t('navPricing') },
    { href: '/portfolio', label: t('navPortfolio') },
    { href: '/about', label: t('navAbout') },
    { href: '/contact', label: t('navContact') },
    { href: '/faqs', label: t('navFaqs') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy-900/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-brand-navy-950/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-electric-500 to-brand-navy-800 border border-brand-electric-400/30 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <span className="font-heading font-extrabold text-white text-lg tracking-wider">F</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-black tracking-tight text-white text-xl">
                FUTURE<span className="text-brand-electric-400">IX</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-500"></span>
            </div>
            <p className="text-[10px] tracking-widest text-slate-400 uppercase hidden sm:block font-sans">
              AI • Marketing • Tech
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-brand-electric-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Bilingual Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-brand-electric-500/40 transition-all cursor-pointer shadow-sm"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-brand-gold-400" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Team / Internal Portal Link */}
          <Link
            href="/internal/pricing-calculator"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-navy-800/80 hover:bg-brand-navy-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-brand-electric-400" />
            <span>{t('navCalculator')}</span>
            {isAuthenticated && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1" title="Authenticated" />
            )}
          </Link>

          {/* Consultation CTA */}
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all bg-gradient-to-r from-brand-electric-600 to-brand-electric-500 rounded-lg shadow-glow hover:brightness-110 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-gold-300" />
            {t('ctaConsultation')}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-200"
          >
            <Languages className="w-3.5 h-3.5 mr-1 text-brand-gold-400" />
            {language === 'en' ? 'हिन्दी' : 'EN'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy-950 border-b border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-white font-medium py-1.5 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}

            <div className="pt-2 flex flex-col space-y-2">
              <Link
                href="/internal/pricing-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-brand-navy-800 border border-white/10 text-sm font-medium text-slate-200"
              >
                <Calculator className="w-4 h-4 text-brand-electric-400" />
                <span>{t('navCalculator')}</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 rounded-lg bg-brand-electric-600 text-white text-sm font-semibold shadow-glow"
              >
                {t('ctaConsultation')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
