'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { HelpCircle, ChevronDown, Sparkles, Calculator, ArrowRight } from 'lucide-react';

export default function FaqsPage() {
  const { language, t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'How are Futureix project estimates calculated?',
      qHi: 'फ्यूचरिक्स प्रोजेक्ट का बजट कैसे तय किया जाता है?',
      aEn: 'All pricing is calculated feature-by-feature based on our master catalogue. Every proposal clearly separates one-time implementation scope from ongoing monthly retainers and third-party fees (such as Meta ad spend or Shopify subscriptions) so there is total transparency.',
      aHi: 'सभी मूल्य हमारे मास्टर कैटलॉग के आधार पर फीचर-दर-फीचर तय किए जाते हैं। प्रत्येक प्रपोजल में एकमुश्त निर्माण लागत, मासिक प्रबंधन शुल्क और थर्ड-पार्टी खर्चों (जैसे मेटा ऐड स्पेंड या शॉपिफाई शुल्क) को अलग-अलग दर्शाया जाता है ताकि पूर्ण पारदर्शिता रहे।',
    },
    {
      qEn: 'Is paid advertising ad budget included in the agency management fee?',
      qHi: 'क्या विज्ञापन खर्च (Ad Spend) एजेंसी की फीस में शामिल होता है?',
      aEn: 'No, absolutely not. Your advertising budget is paid directly to Meta, Google, or LinkedIn via your own corporate ad accounts. The agency management fee covers campaign strategy, audience architecture, ad copy, testing, and continuous ROAS optimization.',
      aHi: 'जी नहीं, बिल्कुल नहीं। आपका विज्ञापन बजट आपके अपने ऐड अकाउंट के ज़रिए सीधे मेटा या गूगल को जाता है। फ्यूचरिक्स की मैनेजमेंट फीस केवल कैंपेन रणनीति, क्रिएटिव कॉपी, A/B टेस्टिंग और ROAS ऑप्टिमाइज़ेशन के लिए होती है।',
    },
    {
      qEn: 'Do you provide complete source code and commercial ownership upon delivery?',
      qHi: 'क्या प्रोजेक्ट पूरा होने पर पूरा सोर्स कोड और स्वामित्व ग्राहक को मिलता है?',
      aEn: 'Yes. Upon completion of milestone payments and formal project handover, 100% of the repository source code, design assets, and database schemas become your company’s intellectual property.',
      aHi: 'हाँ। निर्धारित भुगतान मील के पत्थर पूरे होने और हैंडओवर के बाद, सभी सोर्स कोड, डिज़ाइन फाइल्स और डेटाबेस स्कीमा का 100% बौद्धिक स्वामित्व आपका होता है।',
    },
    {
      qEn: 'How does WhatsApp Business API billing operate?',
      qHi: 'व्हाट्सएप बिजनेस API का खर्च कैसे काम करता है?',
      aEn: 'Futureix charges a one-time setup and workflow implementation fee for onboarding, template approval, and chatbot logic. Ongoing Meta per-conversation utility fees and WhatsApp Business Solution Provider (BSP) hosting subscriptions are billed directly based on your actual message volume.',
      aHi: 'फ्यूचरिक्स केवल ऑनबोर्डिंग, मैसेज टेम्पलेट अप्रूवल और बॉट लॉजिक सेटअप के लिए एकमुश्त फीस लेता है। चालू मेटा प्रति-मैसेज शुल्क और BSP होस्टिंग शुल्क सीधे आपके वास्तविक उपयोग पर आधारित होते हैं।',
    },
    {
      qEn: 'What are your standard payment milestones for custom development?',
      qHi: 'वेबसाइट और ऐप प्रोजेक्ट्स के लिए भुगतान की शर्तें क्या हैं?',
      aEn: 'Our standard terms for scoped software builds are 50% advance upon project kickoff and architecture finalization, and 50% upon completed user acceptance testing and production deployment. Larger multi-month projects may use 3-stage or 4-stage sprint milestones.',
      aHi: 'मानक शर्तों के तहत 50% एडवांस प्रोजेक्ट शुरू होने पर और 50% अंतिम टेस्टिंग व लाइव डिप्लॉयमेंट के समय देय होता है। बड़े प्रोजेक्ट्स में 3 या 4 चरणों के मील के पत्थर तय किए जा सकते हैं।',
    },
    {
      qEn: 'Do you promise guaranteed #1 ranking on Google or guaranteed sales?',
      qHi: 'क्या आप गूगल पर #1 रैंक या निश्चित बिक्री की गारंटी देते हैं?',
      aEn: 'No. Ethical engineering and marketing agencies do not make deceptive guaranteed ranking claims because search engine algorithms and market dynamics are non-deterministic. We implement rigorous technical Core Web Vitals, white-hat semantic SEO, and data-driven ad testing to maximize your probabilities of success.',
      aHi: 'नहीं। कोई भी प्रामाणिक तकनीकी एजेंसी #1 रैंक या बिक्री की झूठी गारंटी नहीं देती। हम स्वच्छ कोड, मजबूत ऑन-पेज SEO और सटीक डेटा एनालिटिक्स के साथ काम करते हैं ताकि आपके व्यवसाय को स्थायी परिणाम मिल सकें।',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'सामान्य प्रश्न' : 'Clear Answers'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('navFaqs')}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          {language === 'hi'
            ? 'मूल्य निर्धारण, कार्य-दायरा, भुगतान शर्तें और तकनीकी डिलीवरी से जुड़े आपके सभी सवाल।'
            : 'Transparent answers regarding scope inclusions, third-party costs, timelines, and source code rights.'}
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-brand-electric-400 transition-colors cursor-pointer"
              >
                <span>{language === 'hi' ? faq.qHi : faq.qEn}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-electric-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                  {language === 'hi' ? faq.aHi : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Calculator Banner */}
      <div className="p-8 rounded-2xl bg-brand-navy-900 border border-brand-electric-500/20 text-center space-y-3">
        <h3 className="font-heading text-xl font-bold text-white">
          {language === 'hi' ? 'क्या आपका कोई अन्य सवाल है?' : 'Still have specific questions about your build?'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {language === 'hi'
            ? 'हमारे ऑनलाइन कैलकुलेटर से अपनी जरूरतें जांचें या सीधे हमारी टीम से बात करें।'
            : 'Run an interactive estimate or chat with our founding team on WhatsApp.'}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/internal/pricing-calculator"
            className="px-5 py-2.5 rounded-xl bg-brand-electric-600 hover:bg-brand-electric-500 text-white font-semibold text-xs shadow-glow transition-all"
          >
            {t('ctaCalculateProject')}
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-all"
          >
            {t('ctaContactUs')}
          </Link>
        </div>
      </div>
    </div>
  );
}
