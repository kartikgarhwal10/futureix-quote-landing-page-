export type Language = 'en' | 'hi';

export type UserRole = 'admin' | 'sales' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type BillingType = 'one_time' | 'monthly' | 'per_unit' | 'custom';

export interface PriceItem {
  id: string;
  categoryId: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  minPrice: number;
  maxPrice: number;
  billingType: BillingType;
  defaultQuantity?: number;
  unitLabelEn?: string;
  unitLabelHi?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  includedInBase?: boolean;
  dependencies?: string[]; // IDs of items required
  exclusions?: string[];   // IDs of items incompatible
  active: boolean;
  lastUpdated: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  taglineEn: string;
  taglineHi: string;
  descriptionEn: string;
  descriptionHi: string;
  startingPrice: number;
  typicalMaxPrice: number;
  iconName: string;
  billingType: BillingType;
  highlightsEn: string[];
  highlightsHi: string[];
  includedEn: string[];
  includedHi: string[];
  excludedEn: string[];
  excludedHi: string[];
  typicalTimelineEn: string;
  typicalTimelineHi: string;
}

export interface PackageBundle {
  id: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  minPrice: number;
  maxPrice: number;
  billingType: BillingType;
  popular?: boolean;
  featuresEn: string[];
  featuresHi: string[];
  idealForEn: string;
  idealForHi: string;
}

export interface CalculatorState {
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  industry: string;
  customerBudget: string;
  projectName: string;
  assignedMember: string;
  quoteLanguage: Language;
  projectType: 'new' | 'redesign' | 'maintenance';
  engagementType: 'one_time' | 'monthly' | 'annual';
  
  // Selected Services
  selectedCategoryIds: string[];
  
  // Web development configs
  webType?: string;
  platform?: string;
  pageCount?: number;
  uniqueTemplates?: number;
  designComplexity?: 'standard' | 'premium' | 'bespoke';
  hasCms?: boolean;
  hasBlog?: boolean;
  hasWhatsapp?: boolean;
  hasPaymentGateway?: boolean;
  hasUserAuth?: boolean;
  hasBooking?: boolean;
  hasCrmIntegration?: boolean;
  hasSeoSetup?: boolean;
  hasAnalytics?: boolean;
  hasMultilingual?: boolean;
  ecommerceProducts?: number;
  
  // Mobile app configs
  appCategory?: string;
  appPlatform?: 'android' | 'ios' | 'both_cross_platform' | 'both_native' | 'pwa';
  userRolesCount?: number;
  screensCount?: number;
  hasAppAuth?: boolean;
  hasAppPayments?: boolean;
  hasPushNotifications?: boolean;
  hasChat?: boolean;
  hasMaps?: boolean;
  hasLiveTracking?: boolean;
  hasAppAdminPanel?: boolean;
  
  // Paid Ads configs
  adPlatforms?: string[];
  adAccountsCount?: number;
  campaignsCount?: number;
  monthlyAdSpendBudget?: number;
  hasAdConversionTracking?: boolean;
  hasRemarketing?: boolean;
  adContractMonths?: number;
  
  // Social Media configs
  socialPlatforms?: string[];
  postsPerMonth?: number;
  reelsPerMonth?: number;
  storiesPerMonth?: number;
  carouselsPerMonth?: number;
  hasCommunityManagement?: boolean;
  
  // WhatsApp & AI configs
  workflowsCount?: number;
  chatbotComplexity?: 'basic' | 'advanced' | 'crm_ai';
  aiModelUsageLevel?: 'low' | 'moderate' | 'heavy';
  hasVoiceTelephony?: boolean;
  
  // Selected additional add-on items IDs
  selectedItemIds: string[];
  itemQuantities: Record<string, number>;
  
  // Commercial Adjustments
  internalPositionPercent: number; // 0 (min) to 100 (max), default 40
  discountPercent: number;
  applyGst: boolean;
  customScopeNotesEn?: string;
  customScopeNotesHi?: string;
  internalNotes?: string;
}

export interface QuoteCalculationResult {
  baseMin: number;
  baseMax: number;
  featureMin: number;
  featureMax: number;
  recurringMin: number;
  recurringMax: number;
  thirdPartyEstimatedMin: number;
  thirdPartyEstimatedMax: number;
  
  // Adjustments
  projectMin: number;
  projectMax: number;
  recommendedSubtotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  finalRecommendedTotal: number;
  
  // Timeline and warnings
  estimatedTimelineEn: string;
  estimatedTimelineHi: string;
  requiresTechnicalDiscovery: boolean;
  discoveryReasonEn?: string;
  discoveryReasonHi?: string;
  
  // Line items for proposal
  lineItems: Array<{
    id: string;
    nameEn: string;
    nameHi: string;
    type: 'base' | 'feature' | 'recurring' | 'third_party';
    minPrice: number;
    maxPrice: number;
    recommendedPrice: number;
    billingType: BillingType;
    quantity: number;
    included: boolean;
  }>;
}

export interface QuoteRecord {
  id: string;
  quoteNumber: string;
  createdAt: string;
  validUntil: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
    city: string;
    industry: string;
  };
  projectName: string;
  assignedMember: string;
  language: Language;
  state: CalculatorState;
  calculation: QuoteCalculationResult;
  version: number;
}

export interface EnquiryRecord {
  id: string;
  referenceId: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  serviceCategory: string;
  budgetRange: string;
  timeline: string;
  description: string;
  preferredLanguage: Language;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

export interface SiteSettings {
  agencyName: string;
  website: string;
  primaryPhone: string;
  whatsappNumber: string; // international digits without +
  primaryEmail: string;
  address: string;
  gstRate: number; // e.g. 18
  gstin: string;
  founders: {
    founder: string;
    coFounder: string;
  };
  maxSalesDiscount: number; // e.g. 15%
}
