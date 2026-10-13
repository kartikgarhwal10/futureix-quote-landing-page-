import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProjectQuote } from '../src/lib/calculatorEngine.ts';

// In ts-node or node with strip-types or direct esm, let's verify if node can run ts directly or if we create a test script that validates the logic.
// In Node 24 (which we checked is installed: v24.18.0), Node has built-in typescript support with --experimental-strip-types!
test('Calculator computes basic web project range accurately', () => {
  const state = {
    customerName: 'Acme Corp',
    contactPerson: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    city: 'Jaipur',
    industry: 'Retail',
    customerBudget: '₹30,000',
    projectName: 'Acme Website',
    assignedMember: 'Kartik Garhwal',
    quoteLanguage: 'en',
    projectType: 'new',
    engagementType: 'one_time',
    selectedCategoryIds: ['web_dev'],
    webType: 'web_small_business', // min: 14999, max: 40000
    selectedItemIds: [],
    itemQuantities: {},
    internalPositionPercent: 50,
    discountPercent: 0,
    applyGst: false,
  };

  const result = calculateProjectQuote(state);
  assert.equal(result.baseMin, 14999);
  assert.equal(result.baseMax, 40000);
  assert.equal(result.projectMin, 14999);
  assert.equal(result.projectMax, 40000);
  // At 50% position: 14999 + (40000 - 14999)*0.5 = 27500 (rounded)
  assert.equal(result.recommendedSubtotal, 27500);
  assert.equal(result.finalRecommendedTotal, 27500);
});

test('Calculator separates direct ad spend from agency revenue', () => {
  const state = {
    customerName: 'D2C Brand',
    contactPerson: 'Priya Verma',
    email: 'priya@d2c.com',
    phone: '+91 9876500000',
    city: 'Mumbai',
    industry: 'E-commerce',
    customerBudget: '₹1,00,000',
    projectName: 'Meta Growth',
    assignedMember: 'Mritunjay Pratap Singh',
    quoteLanguage: 'en',
    projectType: 'new',
    engagementType: 'monthly',
    selectedCategoryIds: ['paid_ads'],
    monthlyAdSpendBudget: 50000,
    selectedItemIds: [],
    itemQuantities: {},
    internalPositionPercent: 40,
    discountPercent: 10,
    applyGst: true,
  };

  const result = calculateProjectQuote(state);
  // Ad spend is marked as thirdPartyEstimatedMin/Max and NOT added to agency projectMin/Max
  assert.equal(result.thirdPartyEstimatedMin, 50000);
  assert.equal(result.thirdPartyEstimatedMax, 50000);
  
  // Agency base fee for ads_meta_monthly is 4999 - 25000
  assert.equal(result.recurringMin, 4999);
  assert.equal(result.recurringMax, 25000);

  // Agency projectMin for one-time scope is 0, since ads is recurring
  assert.equal(result.projectMin, 0);

  // Discount applies to agency recommended fee
  assert.ok(result.discountAmount >= 0);
  assert.ok(result.gstAmount >= 0);
});

test('Mobile app cross-platform multiplier applies correctly', () => {
  const stateCross = {
    customerName: 'Tech Co',
    contactPerson: 'Amit',
    email: 'amit@tech.in',
    phone: '9999999999',
    city: 'Bengaluru',
    industry: 'Tech',
    customerBudget: '₹2,50,000',
    projectName: 'Utility App',
    assignedMember: 'Kartik Garhwal',
    quoteLanguage: 'en',
    projectType: 'new',
    engagementType: 'one_time',
    selectedCategoryIds: ['mobile_apps'],
    appCategory: 'mobile_utility', // min: 50000, max: 150000
    appPlatform: 'both_cross_platform', // 1.35x
    selectedItemIds: [],
    itemQuantities: {},
    internalPositionPercent: 40,
    discountPercent: 0,
    applyGst: false,
  };

  const resultCross = calculateProjectQuote(stateCross);
  // 50000 * 1.35 = 67500
  // 150000 * 1.35 = 202500
  assert.equal(resultCross.baseMin, 67500);
  assert.equal(resultCross.baseMax, 202500);
});

test('Technical discovery flag is triggered for high-complexity enterprise scope', () => {
  const complexState = {
    customerName: 'Enterprise Logistics',
    contactPerson: 'Vikram',
    email: 'vikram@logistics.in',
    phone: '9888888888',
    city: 'Delhi',
    industry: 'Logistics',
    customerBudget: '₹10,00,000',
    projectName: 'Fleet Tracker',
    assignedMember: 'Mritunjay Pratap Singh',
    quoteLanguage: 'en',
    projectType: 'new',
    engagementType: 'one_time',
    selectedCategoryIds: ['web_apps', 'mobile_apps'],
    appCategory: 'mobile_delivery_platform',
    hasLiveTracking: true,
    selectedItemIds: [],
    itemQuantities: {},
    internalPositionPercent: 50,
    discountPercent: 0,
    applyGst: true,
  };

  const result = calculateProjectQuote(complexState);
  assert.equal(result.requiresTechnicalDiscovery, true);
  assert.ok(result.discoveryReasonEn.length > 10);
  assert.ok(result.discoveryReasonHi.length > 10);
});
