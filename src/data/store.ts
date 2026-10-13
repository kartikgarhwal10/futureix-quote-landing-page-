import { EnquiryRecord, QuoteRecord, SiteSettings, PriceItem } from '@/lib/types';
import { MASTER_PRICING_ITEMS } from './priceCatalogue';
import { calculateProjectQuote } from '@/lib/calculatorEngine';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  agencyName: 'FUTUREIX',
  website: 'https://futureix.in',
  primaryPhone: '+91 95091 09332',
  whatsappNumber: '919509109332',
  primaryEmail: 'hello@futureix.in',
  address: 'Jaipur, Rajasthan, India',
  gstRate: 18,
  gstin: '08AAAAF9876Q1Z5',
  founders: {
    founder: 'Kartik Garhwal',
    coFounder: 'Mritunjay Pratap Singh',
  },
  maxSalesDiscount: 15,
};

// Seed initial authentic enquiries
export const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq_101',
    referenceId: 'FIX-ENQ-2601',
    createdAt: '2026-10-12T09:30:00Z',
    name: 'Vikramaditya Rathore',
    businessName: 'Royal Rajasthan Handlooms',
    email: 'vikram@royalhandlooms.in',
    phone: '+91 98291 44552',
    city: 'Jaipur',
    serviceCategory: 'ecommerce',
    budgetRange: '₹50,000–₹1,00,000',
    timeline: '30 days',
    description: 'Looking to migrate our boutique retail collection to a fast custom Shopify store with Razorpay and Shiprocket integration.',
    preferredLanguage: 'en',
    status: 'new',
  },
  {
    id: 'enq_102',
    referenceId: 'FIX-ENQ-2602',
    createdAt: '2026-10-11T14:15:00Z',
    name: 'Sunita Meena',
    businessName: 'Apex Health Diagnostics',
    email: 'sunita@apexdiagnostics.com',
    phone: '+91 94140 88219',
    city: 'Delhi NCR',
    serviceCategory: 'whatsapp_api',
    budgetRange: '₹25,000–₹50,000',
    timeline: '15 days',
    description: 'We need automated patient test report delivery on WhatsApp with appointment booking logic.',
    preferredLanguage: 'hi',
    status: 'contacted',
  },
  {
    id: 'enq_103',
    referenceId: 'FIX-ENQ-2603',
    createdAt: '2026-10-10T11:00:00Z',
    name: 'Arjun Singhal',
    businessName: 'Quantify Fintech Solutions',
    email: 'arjun@quantify.co',
    phone: '+91 98111 22334',
    city: 'Bengaluru',
    serviceCategory: 'web_apps',
    budgetRange: '₹2,00,000–₹4,00,000',
    timeline: '60 days',
    description: 'Bespoke client dashboard for wealth management clients with real-time portfolio summaries.',
    preferredLanguage: 'en',
    status: 'quoted',
  },
];

// Seed initial authentic quotations calculated with the engine
const sampleQuoteState1 = {
  customerName: 'Royal Rajasthan Handlooms',
  contactPerson: 'Vikramaditya Rathore',
  email: 'vikram@royalhandlooms.in',
  phone: '+91 98291 44552',
  city: 'Jaipur',
  industry: 'E-commerce & Retail',
  customerBudget: '₹75,000',
  projectName: 'Custom Shopify Storefront Build',
  assignedMember: 'Kartik Garhwal',
  quoteLanguage: 'en' as const,
  projectType: 'new' as const,
  engagementType: 'one_time' as const,
  selectedCategoryIds: ['ecommerce'],
  platform: 'ecom_custom_shopify',
  ecommerceProducts: 65,
  selectedItemIds: ['ads_setup_capi'],
  itemQuantities: {},
  internalPositionPercent: 40,
  discountPercent: 10,
  applyGst: true,
};

const calc1 = calculateProjectQuote(sampleQuoteState1);

export const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: 'quote_2026_001',
    quoteNumber: 'FX-QT-2026-001',
    createdAt: '2026-10-12T11:00:00Z',
    validUntil: '2026-10-27T23:59:59Z',
    status: 'sent',
    customer: {
      name: sampleQuoteState1.contactPerson,
      company: sampleQuoteState1.customerName,
      email: sampleQuoteState1.email,
      phone: sampleQuoteState1.phone,
      city: sampleQuoteState1.city,
      industry: sampleQuoteState1.industry,
    },
    projectName: sampleQuoteState1.projectName,
    assignedMember: sampleQuoteState1.assignedMember,
    language: 'en',
    state: sampleQuoteState1,
    calculation: calc1,
    version: 1,
  },
];
