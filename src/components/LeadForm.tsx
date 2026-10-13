'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICE_CATEGORIES } from '@/data/priceCatalogue';
import { DEFAULT_SITE_SETTINGS } from '@/data/store';
import { generateEnquiryRef, getWhatsAppUrl } from '@/lib/utils';
import { EnquiryRecord } from '@/lib/types';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

interface LeadFormProps {
  initialServiceId?: string;
  className?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialServiceId, className }) => {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    serviceCategory: initialServiceId || 'web_dev',
    budgetRange: '₹25,000–₹75,000',
    timeline: 'Within 30 days',
    description: '',
    preferredLanguage: language,
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg(
        language === 'hi'
          ? 'कृपया प्राइवेसी पॉलिसी सहमति चेकबॉक्स चुनें।'
          : 'Please accept the privacy terms consent checkbox.'
      );
      return;
    }

    setLoading(true);

    try {
      const ref = generateEnquiryRef();
      const newEnquiry: EnquiryRecord = {
        id: `enq_${Date.now()}`,
        referenceId: ref,
        createdAt: new Date().toISOString(),
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        serviceCategory: formData.serviceCategory,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        description: formData.description,
        preferredLanguage: formData.preferredLanguage as any,
        status: 'new',
      };

      // Store in client storage so internal dashboard reads real saved data
      const existing = JSON.parse(localStorage.getItem('futureix_enquiries') || '[]');
      existing.unshift(newEnquiry);
      localStorage.setItem('futureix_enquiries', JSON.stringify(existing));

      setReferenceId(ref);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg('Failed to process enquiry. Please try again or message via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `Hello Futureix Team, I have submitted an inquiry on your website (Ref: ${referenceId || 'New'}). Name: ${formData.name}, Business: ${formData.businessName || 'N/A'}, Service: ${formData.serviceCategory}. Looking forward to discussing the project roadmap.`;
  const whatsappUrl = getWhatsAppUrl(DEFAULT_SITE_SETTINGS.whatsappNumber, whatsappMessage);

  if (submitted) {
    return (
      <div className={`p-8 bg-brand-navy-900 border border-emerald-500/30 rounded-2xl text-center space-y-6 shadow-card ${className}`}>
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-glow">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-white">
            {t('formSuccessTitle')}
          </h3>
          <p className="text-slate-300 text-sm">
            {t('formSuccessDesc')}{' '}
            <span className="font-mono font-bold text-brand-gold-400 text-base">{referenceId}</span>
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
            {language === 'hi'
              ? 'हमारे टेक्निकल कंसलटेंट 24 घंटे के अंदर आपसे संपर्क करेंगे और आपके प्रोजेक्ट का प्रारंभिक खाका तैयार करेंगे।'
              : 'Our technical strategy leads will review your requirements and reach out within 24 hours with an itemized proposal.'}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-glow"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>{t('ctaChatWhatsApp')}</span>
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                businessName: '',
                email: '',
                phone: '',
                city: '',
                serviceCategory: initialServiceId || 'web_dev',
                budgetRange: '₹25,000–₹75,000',
                timeline: 'Within 30 days',
                description: '',
                preferredLanguage: language,
                consent: false,
              });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium transition-all"
          >
            {language === 'hi' ? 'अन्य इंक्वायरी दर्ज करें' : 'Submit Another Enquiry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 sm:p-8 bg-brand-navy-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-card space-y-5 ${className}`}
    >
      <div className="border-b border-white/10 pb-4">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-electric-500/10 border border-brand-electric-500/20 text-brand-electric-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3 h-3 text-brand-gold-400" />
          <span>{language === 'hi' ? 'मुफ्त प्रोजेक्ट परामर्श' : 'Free Discovery & Quote'}</span>
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
          {t('formTitle')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t('formSubtitle')}
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center">
          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Name */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'आपका नाम *' : 'Your Name *'}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'कंपनी / बिज़नेस का नाम' : 'Business / Brand Name'}
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g. Acme Tech LLP"
            className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'ईमेल एड्रेस *' : 'Work Email *'}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="rahul@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'मोबाइल नंबर (WhatsApp) *' : 'Phone / WhatsApp *'}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'शहर / राज्य' : 'City / Location'}
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Jaipur, Bengaluru, Delhi"
            className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
          />
        </div>

        {/* Service Category */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'सर्विस कैटेगरी' : 'Primary Service Needed'}
          </label>
          <select
            value={formData.serviceCategory}
            onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:outline-none focus:border-brand-electric-400"
          >
            {SERVICE_CATEGORIES.map((s) => (
              <option key={s.id} value={s.id} className="bg-brand-navy-900 text-white">
                {language === 'hi' ? s.titleHi : s.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'अनुमानित बजट' : 'Approximate Budget (INR)'}
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:outline-none focus:border-brand-electric-400"
          >
            <option value="₹10,000–₹25,000">₹10,000 – ₹25,000</option>
            <option value="₹25,000–₹75,000">₹25,000 – ₹75,000</option>
            <option value="₹75,000–₹1,50,000">₹75,000 – ₹1,50,000</option>
            <option value="₹1,50,000–₹5,00,000">₹1,50,000 – ₹5,00,000</option>
            <option value="₹5,00,000+">₹5,00,000+ (Enterprise)</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {language === 'hi' ? 'समय-सीमा' : 'Desired Timeline'}
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg bg-brand-navy-950 border border-white/10 text-white focus:outline-none focus:border-brand-electric-400"
          >
            <option value="Urgent (1-2 weeks)">Urgent (1 - 2 weeks)</option>
            <option value="Within 30 days">Within 30 days</option>
            <option value="1-2 months">1 - 2 months</option>
            <option value="Flexible / Strategic">Flexible / Strategic</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="text-xs">
        <label className="block text-slate-300 font-medium mb-1">
          {language === 'hi' ? 'प्रोजेक्ट का संक्षिप्त विवरण' : 'Project Scope / Requirements'}
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={
            language === 'hi'
              ? 'कृपया अपनी मुख्य आवश्यकताएं, वर्तमान वेबसाइट (यदि कोई हो), या मुख्य लक्ष्य साझा करें...'
              : 'Share your key goals, current website link (if any), or specific requirements...'
          }
          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric-400"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start space-x-2 text-[11px] text-slate-400">
        <input
          type="checkbox"
          id="consentCheckbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-0.5 rounded bg-brand-navy-950 border-white/20 text-brand-electric-500 focus:ring-0"
        />
        <label htmlFor="consentCheckbox" className="leading-snug cursor-pointer">
          {t('formConsent')}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-electric-600 to-brand-electric-500 hover:from-brand-electric-500 hover:to-brand-electric-400 text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? 'Submitting...' : t('ctaSubmitEnquiry')}</span>
      </button>
    </form>
  );
};
