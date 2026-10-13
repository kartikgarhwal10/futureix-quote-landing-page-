import { CalculatorState, QuoteCalculationResult, BillingType } from './types';
import { MASTER_PRICING_ITEMS, SERVICE_CATEGORIES } from '@/data/priceCatalogue';

export function calculateProjectQuote(state: CalculatorState): QuoteCalculationResult {
  let baseMin = 0;
  let baseMax = 0;
  let featureMin = 0;
  let featureMax = 0;
  let recurringMin = 0;
  let recurringMax = 0;
  let thirdPartyMin = 0;
  let thirdPartyMax = 0;

  const lineItems: QuoteCalculationResult['lineItems'] = [];

  // 1. Calculate Base Price from Selected Service Categories or Primary Selection
  if (state.selectedCategoryIds.length === 0) {
    // Default to at least web development single page if nothing selected
    const defaultItem = MASTER_PRICING_ITEMS.find((i) => i.id === 'web_small_business') || MASTER_PRICING_ITEMS[0];
    baseMin = defaultItem.minPrice;
    baseMax = defaultItem.maxPrice;
    lineItems.push({
      id: defaultItem.id,
      nameEn: defaultItem.nameEn,
      nameHi: defaultItem.nameHi,
      type: 'base',
      minPrice: defaultItem.minPrice,
      maxPrice: defaultItem.maxPrice,
      recommendedPrice: Math.round(defaultItem.minPrice + (defaultItem.maxPrice - defaultItem.minPrice) * 0.4),
      billingType: defaultItem.billingType,
      quantity: 1,
      included: true,
    });
  } else {
    state.selectedCategoryIds.forEach((catId) => {
      const cat = SERVICE_CATEGORIES.find((c) => c.id === catId);
      if (!cat) return;

      // Determine appropriate starting item based on specific parameters
      let item = MASTER_PRICING_ITEMS.find((i) => i.categoryId === catId && i.active);

      if (catId === 'web_dev' && state.webType) {
        const found = MASTER_PRICING_ITEMS.find((i) => i.id === state.webType);
        if (found) item = found;
      } else if (catId === 'ecommerce' && state.platform) {
        const found = MASTER_PRICING_ITEMS.find((i) => i.id === state.platform);
        if (found) item = found;
      } else if (catId === 'mobile_apps' && state.appCategory) {
        const found = MASTER_PRICING_ITEMS.find((i) => i.id === state.appCategory);
        if (found) item = found;
      }

      if (item) {
        let itemMin = item.minPrice;
        let itemMax = item.maxPrice;

        // Apply platform multiplier for mobile apps
        if (catId === 'mobile_apps' && state.appPlatform) {
          let multiplier = 1.0;
          if (state.appPlatform === 'both_cross_platform') multiplier = 1.35;
          else if (state.appPlatform === 'both_native') multiplier = 1.9;
          else if (state.appPlatform === 'pwa') multiplier = 0.75;

          itemMin = Math.round(itemMin * multiplier);
          itemMax = Math.round(itemMax * multiplier);
        }

        // Apply design complexity for web
        if (catId === 'web_dev' && state.designComplexity) {
          if (state.designComplexity === 'premium') {
            itemMin = Math.round(itemMin * 1.15);
            itemMax = Math.round(itemMax * 1.25);
          } else if (state.designComplexity === 'bespoke') {
            itemMin = Math.round(itemMin * 1.35);
            itemMax = Math.round(itemMax * 1.5);
          }
        }

        if (item.billingType === 'monthly') {
          recurringMin += itemMin;
          recurringMax += itemMax;
          lineItems.push({
            id: item.id,
            nameEn: item.nameEn,
            nameHi: item.nameHi,
            type: 'recurring',
            minPrice: itemMin,
            maxPrice: itemMax,
            recommendedPrice: Math.round(itemMin + (itemMax - itemMin) * (state.internalPositionPercent / 100)),
            billingType: 'monthly',
            quantity: 1,
            included: true,
          });
        } else {
          baseMin += itemMin;
          baseMax += itemMax;
          lineItems.push({
            id: item.id,
            nameEn: item.nameEn,
            nameHi: item.nameHi,
            type: 'base',
            minPrice: itemMin,
            maxPrice: itemMax,
            recommendedPrice: Math.round(itemMin + (itemMax - itemMin) * (state.internalPositionPercent / 100)),
            billingType: item.billingType,
            quantity: 1,
            included: true,
          });
        }
      }
    });
  }

  // 2. Incremental Web Pages or App Screens calculation
  if (state.pageCount && state.pageCount > 5) {
    const extraPages = state.pageCount - 5;
    const pageUnitPriceMin = 1500;
    const pageUnitPriceMax = 3500;
    const extraMin = extraPages * pageUnitPriceMin;
    const extraMax = extraPages * pageUnitPriceMax;
    featureMin += extraMin;
    featureMax += extraMax;
    lineItems.push({
      id: 'extra_pages',
      nameEn: `Additional Custom Pages (${extraPages} pages)`,
      nameHi: `अतिरिक्त कस्टम पेजेस (${extraPages} पेज)`,
      type: 'feature',
      minPrice: extraMin,
      maxPrice: extraMax,
      recommendedPrice: Math.round(extraMin + (extraMax - extraMin) * (state.internalPositionPercent / 100)),
      billingType: 'one_time',
      quantity: extraPages,
      included: false,
    });
  }

  if (state.screensCount && state.screensCount > 10) {
    const extraScreens = state.screensCount - 10;
    const screenUnitPriceMin = 3000;
    const screenUnitPriceMax = 8000;
    const extraMin = extraScreens * screenUnitPriceMin;
    const extraMax = extraScreens * screenUnitPriceMax;
    featureMin += extraMin;
    featureMax += extraMax;
    lineItems.push({
      id: 'extra_screens',
      nameEn: `Additional App Screens (${extraScreens} screens)`,
      nameHi: `अतिरिक्त ऐप स्क्रीन्स (${extraScreens} स्क्रीन)`,
      type: 'feature',
      minPrice: extraMin,
      maxPrice: extraMax,
      recommendedPrice: Math.round(extraMin + (extraMax - extraMin) * (state.internalPositionPercent / 100)),
      billingType: 'one_time',
      quantity: extraScreens,
      included: false,
    });
  }

  // 3. Process Specific Feature Toggles (with Inclusion Rules to prevent double billing)
  const isEcommerce = state.selectedCategoryIds.includes('ecommerce');
  const isWebDev = state.selectedCategoryIds.includes('web_dev');

  // E-commerce products scaling
  if (isEcommerce && state.ecommerceProducts && state.ecommerceProducts > 50) {
    const extraBatches = Math.ceil((state.ecommerceProducts - 50) / 50);
    const costMin = extraBatches * 3000;
    const costMax = extraBatches * 8000;
    featureMin += costMin;
    featureMax += costMax;
    lineItems.push({
      id: 'extra_ecom_catalog',
      nameEn: `Large Catalog Setup & Formatting (${state.ecommerceProducts} products)`,
      nameHi: `बड़ा कैटलॉग सेटअप व फॉर्मेटिंग (${state.ecommerceProducts} प्रोडक्ट्स)`,
      type: 'feature',
      minPrice: costMin,
      maxPrice: costMax,
      recommendedPrice: Math.round(costMin + (costMax - costMin) * 0.5),
      billingType: 'one_time',
      quantity: state.ecommerceProducts,
      included: false,
    });
  }

  // Payment Gateway: Included in e-commerce, but add-on if standard web or app
  if (state.hasPaymentGateway && !isEcommerce) {
    const item = MASTER_PRICING_ITEMS.find((i) => i.id === 'feat_payments');
    if (item) {
      featureMin += item.minPrice;
      featureMax += item.maxPrice;
      lineItems.push({
        id: item.id,
        nameEn: item.nameEn,
        nameHi: item.nameHi,
        type: 'feature',
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        recommendedPrice: Math.round(item.minPrice + (item.maxPrice - item.minPrice) * 0.4),
        billingType: 'one_time',
        quantity: 1,
        included: false,
      });
    }
  }

  // App Live Tracking Add-on
  if (state.hasLiveTracking) {
    const item = MASTER_PRICING_ITEMS.find((i) => i.id === 'feat_live_tracking');
    if (item) {
      featureMin += item.minPrice;
      featureMax += item.maxPrice;
      lineItems.push({
        id: item.id,
        nameEn: item.nameEn,
        nameHi: item.nameHi,
        type: 'feature',
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        recommendedPrice: Math.round(item.minPrice + (item.maxPrice - item.minPrice) * 0.45),
        billingType: 'one_time',
        quantity: 1,
        included: false,
      });
    }
  }

  // App Chat / Messaging
  if (state.hasChat) {
    const item = MASTER_PRICING_ITEMS.find((i) => i.id === 'feat_chat_messaging');
    if (item) {
      featureMin += item.minPrice;
      featureMax += item.maxPrice;
      lineItems.push({
        id: item.id,
        nameEn: item.nameEn,
        nameHi: item.nameHi,
        type: 'feature',
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        recommendedPrice: Math.round(item.minPrice + (item.maxPrice - item.minPrice) * 0.45),
        billingType: 'one_time',
        quantity: 1,
        included: false,
      });
    }
  }

  // CAPI & GA4 tracking setup for ads
  if (state.hasAdConversionTracking) {
    const itemCapi = MASTER_PRICING_ITEMS.find((i) => i.id === 'ads_setup_capi');
    if (itemCapi) {
      featureMin += itemCapi.minPrice;
      featureMax += itemCapi.maxPrice;
      lineItems.push({
        id: itemCapi.id,
        nameEn: itemCapi.nameEn,
        nameHi: itemCapi.nameHi,
        type: 'feature',
        minPrice: itemCapi.minPrice,
        maxPrice: itemCapi.maxPrice,
        recommendedPrice: Math.round(itemCapi.minPrice + (itemCapi.maxPrice - itemCapi.minPrice) * 0.5),
        billingType: 'one_time',
        quantity: 1,
        included: false,
      });
    }
  }

  // WhatsApp & AI Bots
  if (state.chatbotComplexity === 'advanced' || state.chatbotComplexity === 'crm_ai') {
    const botItem = state.chatbotComplexity === 'crm_ai'
      ? MASTER_PRICING_ITEMS.find((i) => i.id === 'wa_crm_chatbot')
      : MASTER_PRICING_ITEMS.find((i) => i.id === 'ai_sales_agent');
    if (botItem) {
      featureMin += botItem.minPrice;
      featureMax += botItem.maxPrice;
      lineItems.push({
        id: botItem.id,
        nameEn: botItem.nameEn,
        nameHi: botItem.nameHi,
        type: 'feature',
        minPrice: botItem.minPrice,
        maxPrice: botItem.maxPrice,
        recommendedPrice: Math.round(botItem.minPrice + (botItem.maxPrice - botItem.minPrice) * 0.4),
        billingType: 'one_time',
        quantity: 1,
        included: false,
      });
    }
  }

  // 4. Process Any Individually Selected Catalogue Add-ons
  if (state.selectedItemIds && state.selectedItemIds.length > 0) {
    state.selectedItemIds.forEach((itemId) => {
      // Check if item isn't already added
      if (lineItems.some((li) => li.id === itemId)) return;
      const item = MASTER_PRICING_ITEMS.find((i) => i.id === itemId);
      if (!item) return;

      const qty = state.itemQuantities[itemId] || 1;
      const itemMin = item.minPrice * qty;
      const itemMax = item.maxPrice * qty;

      if (item.billingType === 'monthly') {
        recurringMin += itemMin;
        recurringMax += itemMax;
        lineItems.push({
          id: item.id,
          nameEn: `${item.nameEn}${qty > 1 ? ` (x${qty})` : ''}`,
          nameHi: `${item.nameHi}${qty > 1 ? ` (x${qty})` : ''}`,
          type: 'recurring',
          minPrice: itemMin,
          maxPrice: itemMax,
          recommendedPrice: Math.round(itemMin + (itemMax - itemMin) * (state.internalPositionPercent / 100)),
          billingType: 'monthly',
          quantity: qty,
          included: false,
        });
      } else {
        featureMin += itemMin;
        featureMax += itemMax;
        lineItems.push({
          id: item.id,
          nameEn: `${item.nameEn}${qty > 1 ? ` (x${qty})` : ''}`,
          nameHi: `${item.nameHi}${qty > 1 ? ` (x${qty})` : ''}`,
          type: 'feature',
          minPrice: itemMin,
          maxPrice: itemMax,
          recommendedPrice: Math.round(itemMin + (itemMax - itemMin) * (state.internalPositionPercent / 100)),
          billingType: item.billingType,
          quantity: qty,
          included: false,
        });
      }
    });
  }

  // 5. Explicitly Separate Monthly Ad Spend Budget from Agency Service Revenue!
  if (state.monthlyAdSpendBudget && state.monthlyAdSpendBudget > 0) {
    thirdPartyMin += state.monthlyAdSpendBudget;
    thirdPartyMax += state.monthlyAdSpendBudget;
    lineItems.push({
      id: 'direct_ad_spend_pass_through',
      nameEn: `Estimated Monthly Ad Spend (Paid directly to Meta/Google by Client)`,
      nameHi: `अनुमानित मासिक ऐड बजट (ग्राहक द्वारा सीधे मेटा/गूगल को देय)`,
      type: 'third_party',
      minPrice: state.monthlyAdSpendBudget,
      maxPrice: state.monthlyAdSpendBudget,
      recommendedPrice: state.monthlyAdSpendBudget,
      billingType: 'monthly',
      quantity: 1,
      included: false,
    });
  }

  // 6. Aggregate Totals
  const projectMin = baseMin + featureMin;
  const projectMax = baseMax + featureMax;

  // Calculate recommended subtotal based on the internal position percentage
  const positionRatio = Math.max(0, Math.min(100, state.internalPositionPercent)) / 100;
  let recommendedSubtotal = Math.round(projectMin + (projectMax - projectMin) * positionRatio);

  // Apply authorized discount
  const discountRate = Math.max(0, Math.min(50, state.discountPercent || 0)) / 100;
  const discountAmount = Math.round(recommendedSubtotal * discountRate);
  const taxableAmount = recommendedSubtotal - discountAmount;

  // Apply GST if configured (standard 18% in India)
  const gstAmount = state.applyGst ? Math.round(taxableAmount * 0.18) : 0;
  const finalRecommendedTotal = taxableAmount + gstAmount;

  // 7. Timeline Estimation
  let estimatedTimelineEn = '10 to 20 business days';
  let estimatedTimelineHi = '10 से 20 कार्य दिवस';

  if (state.selectedCategoryIds.includes('mobile_apps') || state.selectedCategoryIds.includes('web_apps')) {
    estimatedTimelineEn = '30 to 60 business days';
    estimatedTimelineHi = '30 से 60 कार्य दिवस';
  } else if (state.selectedCategoryIds.includes('ecommerce')) {
    estimatedTimelineEn = '15 to 30 business days';
    estimatedTimelineHi = '15 से 30 कार्य दिवस';
  } else if (projectMax > 150000) {
    estimatedTimelineEn = '25 to 45 business days';
    estimatedTimelineHi = '25 से 45 कार्य दिवस';
  }

  // 8. Technical Discovery Warning Check
  let requiresTechnicalDiscovery = false;
  let discoveryReasonEn: string | undefined;
  let discoveryReasonHi: string | undefined;

  if (
    projectMax > 400000 ||
    state.hasLiveTracking ||
    state.appPlatform === 'both_native' ||
    (state.selectedCategoryIds.includes('web_apps') && state.selectedCategoryIds.includes('mobile_apps'))
  ) {
    requiresTechnicalDiscovery = true;
    discoveryReasonEn = 'Multi-platform custom architecture with real-time sync requires technical discovery to finalize precise milestones and cloud infrastructure requirements.';
    discoveryReasonHi = 'मल्टी-प्लेटफॉर्म कस्टम आर्किटेक्चर और रियल-टाइम सिंक के लिए सटीक मील के पत्थर और क्लाउड इंफ्रास्ट्रक्चर तय करने हेतु तकनीकी डिस्कवरी आवश्यक है।';
  }

  return {
    baseMin,
    baseMax,
    featureMin,
    featureMax,
    recurringMin,
    recurringMax,
    thirdPartyEstimatedMin: thirdPartyMin,
    thirdPartyEstimatedMax: thirdPartyMax,
    projectMin,
    projectMax,
    recommendedSubtotal,
    discountAmount,
    taxableAmount,
    gstAmount,
    finalRecommendedTotal,
    estimatedTimelineEn,
    estimatedTimelineHi,
    requiresTechnicalDiscovery,
    discoveryReasonEn,
    discoveryReasonHi,
    lineItems,
  };
}
