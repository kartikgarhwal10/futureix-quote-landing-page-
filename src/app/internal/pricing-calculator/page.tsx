'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { SERVICE_CATEGORIES, MASTER_PRICING_ITEMS } from '@/data/priceCatalogue';
import { CalculatorState, QuoteRecord } from '@/lib/types';
import { calculateProjectQuote } from '@/lib/calculatorEngine';
import { formatINR, generateQuoteNumber } from '@/lib/utils';
import { QuotationModal } from '@/components/QuotationModal';
import {
  Calculator,
  Save,
  Copy,
  Printer,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
  Sliders,
  Percent,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function PricingCalculatorPage() {
  const { language, t } = useLanguage();
  const { user, permissions } = useAuth();

  // Multi-step state: 1 (Client & Project), 2 (Services), 3 (Configuration), 4 (Review)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [savedQuotes, setSavedQuotes] = useState<QuoteRecord[]>([]);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [activeQuoteRecord, setActiveQuoteRecord] = useState<QuoteRecord | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Initial Calculator State
  const initialFormState: CalculatorState = {
    customerName: 'Aura Lifestyle Pvt Ltd',
    contactPerson: 'Siddharth Mehta',
    email: 'siddharth@auralifestyle.in',
    phone: '+91 98290 88776',
    city: 'Jaipur',
    industry: 'Retail & Fashion',
    customerBudget: '₹75,000–₹1,50,000',
    projectName: 'E-commerce Digital Launch & Meta Ads',
    assignedMember: user?.name || 'Kartik Garhwal',
    quoteLanguage: language,
    projectType: 'new',
    engagementType: 'one_time',
    selectedCategoryIds: ['ecommerce', 'paid_ads'],
    platform: 'ecom_custom_shopify',
    ecommerceProducts: 40,
    hasPaymentGateway: true,
    pageCount: 6,
    designComplexity: 'premium',
    appCategory: 'mobile_ecommerce',
    appPlatform: 'both_cross_platform',
    screensCount: 12,
    hasLiveTracking: false,
    hasChat: false,
    monthlyAdSpendBudget: 40000,
    hasAdConversionTracking: true,
    chatbotComplexity: 'basic',
    selectedItemIds: ['ads_setup_capi'],
    itemQuantities: {},
    internalPositionPercent: 40,
    discountPercent: 5,
    applyGst: true,
  };

  const [state, setState] = useState<CalculatorState>(initialFormState);

  // Calculate live estimate instantly on state change
  const calculation = useMemo(() => {
    return calculateProjectQuote(state);
  }, [state]);

  // Load existing quotes from storage
  useEffect(() => {
    const existing = localStorage.getItem('futureix_quotes');
    if (existing) {
      try {
        setSavedQuotes(JSON.parse(existing));
      } catch {}
    }
  }, []);

  const handleServiceToggle = (categoryId: string) => {
    setState((prev) => {
      const exists = prev.selectedCategoryIds.includes(categoryId);
      const updated = exists
        ? prev.selectedCategoryIds.filter((id) => id !== categoryId)
        : [...prev.selectedCategoryIds, categoryId];
      return { ...prev, selectedCategoryIds: updated.length ? updated : ['web_dev'] };
    });
  };

  const handleAddItem = (itemId: string) => {
    setState((prev) => {
      const exists = prev.selectedItemIds.includes(itemId);
      return {
        ...prev,
        selectedItemIds: exists
          ? prev.selectedItemIds.filter((id) => id !== itemId)
          : [...prev.selectedItemIds, itemId],
      };
    });
  };

  const handleSaveDraft = () => {
    const quoteNum = generateQuoteNumber();
    const newQuote: QuoteRecord = {
      id: `quote_${Date.now()}`,
      quoteNumber: quoteNum,
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString(),
      status: 'draft',
      customer: {
        name: state.contactPerson,
        company: state.customerName,
        email: state.email,
        phone: state.phone,
        city: state.city,
        industry: state.industry,
      },
      projectName: state.projectName,
      assignedMember: state.assignedMember,
      language: state.quoteLanguage,
      state: { ...state },
      calculation: { ...calculation },
      version: 1,
    };

    const updated = [newQuote, ...savedQuotes];
    setSavedQuotes(updated);
    localStorage.setItem('futureix_quotes', JSON.stringify(updated));
    setActiveQuoteRecord(newQuote);
    alert(`Quotation ${quoteNum} saved to internal records.`);
  };

  const handleGenerateProposal = () => {
    const quoteNum = activeQuoteRecord?.quoteNumber || generateQuoteNumber();
    const quoteRecord: QuoteRecord = {
      id: activeQuoteRecord?.id || `quote_${Date.now()}`,
      quoteNumber: quoteNum,
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString(),
      status: 'sent',
      customer: {
        name: state.contactPerson,
        company: state.customerName,
        email: state.email,
        phone: state.phone,
        city: state.city,
        industry: state.industry,
      },
      projectName: state.projectName,
      assignedMember: state.assignedMember,
      language: state.quoteLanguage,
      state: { ...state },
      calculation: { ...calculation },
      version: 1,
    };

    setActiveQuoteRecord(quoteRecord);
    setShowProposalModal(true);
  };

  const handleCopySummary = () => {
    const summary = `FUTUREIX PROJECT ESTIMATE: ${state.projectName}
Client: ${state.customerName} (${state.contactPerson})
One-time Scope: ${formatINR(calculation.projectMin)} – ${formatINR(calculation.projectMax)}
Recommended Estimate: ${formatINR(calculation.recommendedSubtotal)}
${calculation.recurringMin > 0 ? `Monthly Retainer: ${formatINR(calculation.recurringMin)} – ${formatINR(calculation.recurringMax)} / mo\n` : ''}${state.monthlyAdSpendBudget ? `Direct Ad Spend Pass-through: ${formatINR(state.monthlyAdSpendBudget)} / mo\n` : ''}Estimated Timeline: ${calculation.estimatedTimelineEn}
Tax (GST 18%): ${state.applyGst ? formatINR(calculation.gstAmount) : 'Excluded'}
Final Total: ${formatINR(calculation.finalRecommendedTotal)}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Reset calculator to defaults?')) {
      setState(initialFormState);
      setActiveStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-[#030A16] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Workspace Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Futureix Internal Calculation Suite</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {t('calcHeading')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('calcSubheading')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 flex items-center transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('ctaClearSelections')}</span>
            </button>

            <button
              onClick={handleSaveDraft}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 flex items-center transition-colors"
            >
              <Save className="w-3.5 h-3.5 mr-1.5 text-brand-electric-400" />
              <span>{t('ctaSaveDraft')}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 flex items-center transition-colors relative"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5 text-brand-gold-400" />
              <span>{copiedNotification ? 'Copied!' : t('ctaCopySummary')}</span>
            </button>

            <button
              onClick={handleGenerateProposal}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-electric-600 to-brand-electric-500 hover:from-brand-electric-500 hover:to-brand-electric-400 text-white text-xs font-semibold shadow-glow flex items-center transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>{t('ctaExportPdf')}</span>
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 border-b border-white/10 pb-4 text-xs font-medium">
          {[
            { num: 1, label: t('stepCustomer') },
            { num: 2, label: t('stepService') },
            { num: 3, label: t('stepConfiguration') },
            { num: 4, label: t('stepSummary') },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-left transition-all ${
                activeStep === s.num
                  ? 'bg-brand-electric-500/10 text-brand-electric-400 border border-brand-electric-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStep === s.num ? 'bg-brand-electric-500 text-white' : 'bg-white/10 text-slate-400'
                }`}
              >
                {s.num}
              </span>
              <span className="hidden sm:inline truncate">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Main Grid: Left Config Panel & Right Live Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Config Area (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: Customer & Project Details */}
            {activeStep === 1 && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5 border border-white/10 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-white flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-electric-400 mr-2" />
                  <span>{t('stepCustomer')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldCustomerName')}</label>
                    <input
                      type="text"
                      value={state.customerName}
                      onChange={(e) => setState({ ...state, customerName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldContactPerson')}</label>
                    <input
                      type="text"
                      value={state.contactPerson}
                      onChange={(e) => setState({ ...state, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldEmail')}</label>
                    <input
                      type="email"
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldPhone')}</label>
                    <input
                      type="tel"
                      value={state.phone}
                      onChange={(e) => setState({ ...state, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldCity')}</label>
                    <input
                      type="text"
                      value={state.city}
                      onChange={(e) => setState({ ...state, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldIndustry')}</label>
                    <input
                      type="text"
                      value={state.industry}
                      onChange={(e) => setState({ ...state, industry: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldProjectName')}</label>
                    <input
                      type="text"
                      value={state.projectName}
                      onChange={(e) => setState({ ...state, projectName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldAssignedMember')}</label>
                    <input
                      type="text"
                      value={state.assignedMember}
                      onChange={(e) => setState({ ...state, assignedMember: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldQuoteLanguage')}</label>
                    <select
                      value={state.quoteLanguage}
                      onChange={(e) => setState({ ...state, quoteLanguage: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    >
                      <option value="en">English Proposal</option>
                      <option value="hi">हिन्दी प्रपोजल (Hindi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('fieldProjectType')}</label>
                    <select
                      value={state.projectType}
                      onChange={(e) => setState({ ...state, projectType: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:border-brand-electric-400 outline-none"
                    >
                      <option value="new">{t('typeNew')}</option>
                      <option value="redesign">{t('typeRedesign')}</option>
                      <option value="maintenance">{t('typeMaintenance')}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-2.5 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs flex items-center shadow-glow transition-all"
                  >
                    <span>Proceed to Services</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Service Selection */}
            {activeStep === 2 && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5 border border-white/10 animate-fadeIn">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-brand-gold-400 mr-2" />
                    <span>{t('stepService')}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select one or multiple service disciplines to include in this quotation scope.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isSelected = state.selectedCategoryIds.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleServiceToggle(cat.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                          isSelected
                            ? 'bg-brand-electric-500/15 border-brand-electric-400 shadow-glow'
                            : 'bg-brand-navy-950/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-white">
                            {language === 'hi' ? cat.titleHi : cat.titleEn}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {language === 'hi' ? cat.taglineHi : cat.taglineEn}
                          </p>
                          <span className="font-mono text-brand-gold-400 font-bold text-xs mt-2 inline-block">
                            Starts {formatINR(cat.startingPrice)}
                            {cat.billingType === 'monthly' && ' / mo'}
                          </span>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-3 ${
                            isSelected ? 'bg-brand-electric-500 text-white' : 'border border-white/20'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs flex items-center shadow-glow transition-all"
                  >
                    <span>Configure Feature Parameters</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Detailed Configuration */}
            {activeStep === 3 && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-white/10 animate-fadeIn">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-heading text-lg font-bold text-white flex items-center">
                    <Sliders className="w-4 h-4 mr-2 text-brand-electric-400" />
                    <span>{t('stepConfiguration')}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fine-tune deliverables, quantities, complexity multipliers, and add-ons.
                  </p>
                </div>

                {/* Web Development Options */}
                {state.selectedCategoryIds.includes('web_dev') && (
                  <div className="bg-brand-navy-950/60 p-4 rounded-xl border border-white/10 space-y-4 text-xs">
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-brand-electric-400">
                      Website Architecture & Page Scope
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">Website Classification</label>
                        <select
                          value={state.webType || 'web_small_business'}
                          onChange={(e) => setState({ ...state, webType: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                        >
                          {MASTER_PRICING_ITEMS.filter((i) => i.categoryId === 'web_dev').map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.nameEn} ({formatINR(item.minPrice)} – {formatINR(item.maxPrice)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">Total Estimated Pages: {state.pageCount}</label>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={state.pageCount || 5}
                          onChange={(e) => setState({ ...state, pageCount: Number(e.target.value) })}
                          className="w-full accent-brand-electric-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Standard scope includes up to 5 pages. Additional pages add ₹1,500 – ₹3,500/page.
                        </span>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">Design & Motion Complexity</label>
                        <select
                          value={state.designComplexity || 'standard'}
                          onChange={(e) => setState({ ...state, designComplexity: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                        >
                          <option value="standard">Standard Responsive (1.0x)</option>
                          <option value="premium">Premium Motion & Micro-interactions (1.2x)</option>
                          <option value="bespoke">Bespoke Luxury Agency Experience (1.45x)</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <input
                          type="checkbox"
                          id="webPay"
                          checked={state.hasPaymentGateway}
                          onChange={(e) => setState({ ...state, hasPaymentGateway: e.target.checked })}
                          className="rounded bg-brand-navy-900 border-white/20 text-brand-electric-500"
                        />
                        <label htmlFor="webPay" className="text-slate-300 cursor-pointer">
                          Include Razorpay / Payment Gateway (+₹10k–₹30k)
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* E-commerce Options */}
                {state.selectedCategoryIds.includes('ecommerce') && (
                  <div className="bg-brand-navy-950/60 p-4 rounded-xl border border-white/10 space-y-4 text-xs">
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-brand-gold-400">
                      E-commerce Platform & Product Catalog
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">Commerce Framework</label>
                        <select
                          value={state.platform || 'ecom_custom_shopify'}
                          onChange={(e) => setState({ ...state, platform: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                        >
                          {MASTER_PRICING_ITEMS.filter((i) => i.categoryId === 'ecommerce').map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.nameEn} ({formatINR(item.minPrice)} – {formatINR(item.maxPrice)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          Product SKUs to Configure: {state.ecommerceProducts || 30}
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="250"
                          step="10"
                          value={state.ecommerceProducts || 30}
                          onChange={(e) => setState({ ...state, ecommerceProducts: Number(e.target.value) })}
                          className="w-full accent-brand-gold-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Base packages cover up to 50 SKUs. Larger uploads format with automated batch rules.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile App Options */}
                {state.selectedCategoryIds.includes('mobile_apps') && (
                  <div className="bg-brand-navy-950/60 p-4 rounded-xl border border-white/10 space-y-4 text-xs">
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-emerald-400">
                      Mobile App Platforms & Real-time Modules
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">Platform Architecture</label>
                        <select
                          value={state.appPlatform || 'both_cross_platform'}
                          onChange={(e) => setState({ ...state, appPlatform: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                        >
                          <option value="both_cross_platform">iOS + Android Shared Codebase (1.35x Multiplier)</option>
                          <option value="both_native">Separate Native iOS & Android (1.9x Multiplier)</option>
                          <option value="android">Android Only (1.0x Multiplier)</option>
                          <option value="ios">iOS Only (1.0x Multiplier)</option>
                          <option value="pwa">Progressive Web App (0.75x Multiplier)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">Total App Screens: {state.screensCount || 10}</label>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          value={state.screensCount || 10}
                          onChange={(e) => setState({ ...state, screensCount: Number(e.target.value) })}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="appLiveTrack"
                          checked={state.hasLiveTracking}
                          onChange={(e) => setState({ ...state, hasLiveTracking: e.target.checked })}
                          className="rounded bg-brand-navy-900 border-white/20 text-emerald-500"
                        />
                        <label htmlFor="appLiveTrack" className="text-slate-300 cursor-pointer">
                          Live GPS / Route Tracking (+₹30k–₹100k)
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="appChat"
                          checked={state.hasChat}
                          onChange={(e) => setState({ ...state, hasChat: e.target.checked })}
                          className="rounded bg-brand-navy-900 border-white/20 text-emerald-500"
                        />
                        <label htmlFor="appChat" className="text-slate-300 cursor-pointer">
                          Real-time In-App Chat (+₹20k–₹60k)
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paid Ads Configuration */}
                {state.selectedCategoryIds.includes('paid_ads') && (
                  <div className="bg-brand-navy-950/60 p-4 rounded-xl border border-white/10 space-y-4 text-xs">
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-rose-400">
                      Paid Advertising Management & Direct Ad Spend
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">
                          Direct Client Ad Spend Budget / Month (Paid directly to Meta/Google):
                        </label>
                        <select
                          value={state.monthlyAdSpendBudget || 25000}
                          onChange={(e) => setState({ ...state, monthlyAdSpendBudget: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                        >
                          <option value={15000}>₹15,000 / month direct ad budget</option>
                          <option value={30000}>₹30,000 / month direct ad budget</option>
                          <option value={50000}>₹50,000 / month direct ad budget</option>
                          <option value={100000}>₹1,00,000 / month direct ad budget</option>
                          <option value={250000}>₹2,50,000+ / month scale budget</option>
                        </select>
                        <span className="text-[10px] text-amber-400 block mt-1">
                          Note: Direct ad spend is tracked separately as client expense and is never counted as agency service revenue.
                        </span>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="capiCheck"
                            checked={state.hasAdConversionTracking}
                            onChange={(e) => setState({ ...state, hasAdConversionTracking: e.target.checked })}
                            className="rounded bg-brand-navy-900 border-white/20 text-brand-electric-500"
                          />
                          <label htmlFor="capiCheck" className="text-slate-300 cursor-pointer">
                            Server-side Meta CAPI & GA4 Setup (+₹3,999–₹12,000)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Catalog Add-ons */}
                <div className="pt-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
                    Available Modular Add-ons from Catalogue:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {MASTER_PRICING_ITEMS.filter((i) => i.isOptional).slice(0, 8).map((addon) => {
                      const isAdded = state.selectedItemIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleAddItem(addon.id)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                            isAdded
                              ? 'bg-brand-electric-500/20 border-brand-electric-400 text-white'
                              : 'bg-brand-navy-950/40 border-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{addon.nameEn}</p>
                            <p className="text-[10px] text-brand-gold-400 font-mono">
                              +{formatINR(addon.minPrice)} – {formatINR(addon.maxPrice)}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isAdded ? 'bg-brand-electric-500 text-white' : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {isAdded ? 'Added' : '+ Add'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Commercial Adjustments: Position, Discount, GST */}
                <div className="p-5 rounded-xl bg-brand-navy-950 border border-brand-electric-500/20 space-y-4 text-xs">
                  <h4 className="font-semibold text-white uppercase tracking-wider flex items-center text-brand-electric-400">
                    <Percent className="w-3.5 h-3.5 mr-1.5" />
                    <span>Commercial Controls & Adjustments</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1">
                        Recommended Position: {state.internalPositionPercent}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={state.internalPositionPercent}
                        onChange={(e) => setState({ ...state, internalPositionPercent: Number(e.target.value) })}
                        className="w-full accent-brand-electric-500 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Position between Min (0%) and Max (100%)
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">
                        Authorized Discount: {state.discountPercent}%
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={permissions.maxDiscountAllowed}
                        value={state.discountPercent}
                        onChange={(e) =>
                          setState({
                            ...state,
                            discountPercent: Math.min(permissions.maxDiscountAllowed, Math.max(0, Number(e.target.value))),
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-brand-navy-900 border border-white/10 text-white outline-none"
                      />
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Max allowed for {user?.role || 'sales'}: {permissions.maxDiscountAllowed}%
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 pt-4">
                      <input
                        type="checkbox"
                        id="gstToggle"
                        checked={state.applyGst}
                        onChange={(e) => setState({ ...state, applyGst: e.target.checked })}
                        className="rounded bg-brand-navy-900 border-white/20 text-brand-electric-500"
                      />
                      <label htmlFor="gstToggle" className="text-slate-300 cursor-pointer font-medium">
                        Apply GST (18%) to Estimate
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs flex items-center shadow-glow transition-all"
                  >
                    <span>View Quote Summary</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review Scope & Deliverables */}
            {activeStep === 4 && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-white/10 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Scope Review & Line Item Breakdown
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Customer: <strong className="text-white">{state.customerName}</strong> ({state.contactPerson})
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-brand-electric-500/20 text-brand-electric-400 text-xs font-mono font-bold">
                    {calculation.lineItems.length} Scoped Deliverables
                  </span>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 pb-2">
                        <th className="py-2">Item</th>
                        <th className="py-2">Type</th>
                        <th className="py-2 text-right">Min – Max</th>
                        <th className="py-2 text-right">Recommended</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {calculation.lineItems.map((item, idx) => (
                        <tr key={idx} className="text-slate-300">
                          <td className="py-2.5 font-medium text-white">
                            {state.quoteLanguage === 'hi' ? item.nameHi : item.nameEn}
                            {item.included && (
                              <span className="text-[10px] text-emerald-400 ml-2 font-mono">[Base Included]</span>
                            )}
                          </td>
                          <td className="py-2.5 capitalize text-slate-400">{item.billingType}</td>
                          <td className="py-2.5 text-right font-mono text-slate-400">
                            {formatINR(item.minPrice)} – {formatINR(item.maxPrice)}
                          </td>
                          <td className="py-2.5 text-right font-mono font-bold text-brand-gold-400">
                            {formatINR(item.recommendedPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
                  >
                    Adjust Parameters
                  </button>
                  <button
                    onClick={handleGenerateProposal}
                    className="px-6 py-2.5 rounded-lg bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs flex items-center shadow-glow transition-all"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1.5" />
                    <span>Open Proposal Modal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Sticky Estimate Card */}
          <div className="lg:col-span-1 sticky top-24 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-brand-electric-500/30 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  {t('stepSummary')}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Technical Discovery Warning if triggered */}
              {calculation.requiresTechnicalDiscovery && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                  <div className="flex items-center font-bold">
                    <AlertTriangle className="w-4 h-4 mr-1.5 shrink-0 text-amber-400" />
                    <span>Technical Discovery Required</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 leading-relaxed">
                    {state.quoteLanguage === 'hi'
                      ? calculation.discoveryReasonHi
                      : calculation.discoveryReasonEn}
                  </p>
                </div>
              )}

              {/* Live Price Breakdown */}
              <div className="space-y-3 text-xs">
                {/* One-time Range */}
                <div className="p-3 rounded-xl bg-brand-navy-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {t('sumRange')} (One-time)
                  </span>
                  <div className="text-xl font-extrabold font-mono text-white">
                    {formatINR(calculation.projectMin)}
                    <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                      – {formatINR(calculation.projectMax)}
                    </span>
                  </div>
                </div>

                {/* Subtotal Recommended */}
                <div className="flex justify-between py-1 text-slate-300 border-b border-white/5">
                  <span>{t('sumSubtotal')}</span>
                  <span className="font-mono font-medium">{formatINR(calculation.recommendedSubtotal)}</span>
                </div>

                {/* Recurring Retainers */}
                {calculation.recurringMin > 0 && (
                  <div className="flex justify-between py-1 text-slate-300 border-b border-white/5">
                    <span>{t('sumRecurringCharges')}</span>
                    <span className="font-mono font-medium text-brand-electric-400">
                      {formatINR(Math.round(calculation.recurringMin + (calculation.recurringMax - calculation.recurringMin) * 0.4))} / mo
                    </span>
                  </div>
                )}

                {/* Third Party Costs */}
                {calculation.thirdPartyEstimatedMin > 0 && (
                  <div className="flex justify-between py-1 text-amber-300 border-b border-white/5">
                    <span>{t('sumThirdParty')}</span>
                    <span className="font-mono font-medium">
                      {formatINR(calculation.thirdPartyEstimatedMin)} / mo
                    </span>
                  </div>
                )}

                {/* Discount */}
                {calculation.discountAmount > 0 && (
                  <div className="flex justify-between py-1 text-emerald-400 border-b border-white/5">
                    <span>{t('sumDiscount')} ({state.discountPercent}%)</span>
                    <span className="font-mono font-medium">-{formatINR(calculation.discountAmount)}</span>
                  </div>
                )}

                {/* GST */}
                {state.applyGst && (
                  <div className="flex justify-between py-1 text-slate-300 border-b border-white/5">
                    <span>{t('sumTaxGst')}</span>
                    <span className="font-mono font-medium">{formatINR(calculation.gstAmount)}</span>
                  </div>
                )}

                {/* Final Total Investment */}
                <div className="pt-2">
                  <span className="text-[10px] text-brand-gold-400 uppercase tracking-wider font-semibold block">
                    {t('sumTotalEstimate')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    {formatINR(calculation.finalRecommendedTotal)}
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2 text-[11px] text-slate-400 border-t border-white/5">
                  <span className="text-slate-300 font-medium block">
                    {t('sumTimeline')}:
                  </span>
                  <p className="text-white mt-0.5">
                    {state.quoteLanguage === 'hi'
                      ? calculation.estimatedTimelineHi
                      : calculation.estimatedTimelineEn}
                  </p>
                </div>

                {/* Milestones notice */}
                <p className="text-[10px] text-slate-500 leading-snug pt-1">
                  {t('sumPaymentTerms')}
                </p>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleGenerateProposal}
                  className="w-full py-3 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center justify-center cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 mr-2" />
                  <span>{t('ctaGenerateQuote')}</span>
                </button>

                <button
                  onClick={handleSaveDraft}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center"
                >
                  <Save className="w-3.5 h-3.5 mr-2" />
                  <span>{t('ctaSaveDraft')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Proposal Modal View */}
      {showProposalModal && activeQuoteRecord && (
        <QuotationModal
          quote={activeQuoteRecord}
          onClose={() => setShowProposalModal(false)}
        />
      )}
    </div>
  );
}
