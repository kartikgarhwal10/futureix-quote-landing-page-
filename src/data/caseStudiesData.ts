export interface CaseStudy {
  id: string;
  titleEn: string;
  titleHi: string;
  clientSectorEn: string;
  clientSectorHi: string;
  deliverablesEn: string[];
  deliverablesHi: string[];
  techStack: string[];
  summaryEn: string;
  summaryHi: string;
  outcomesEn: string[];
  outcomesHi: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs_handloom_ecommerce',
    titleEn: 'Textile Brand Direct-to-Consumer Digital Transformation',
    titleHi: 'टेक्सटाइल ब्रांड का डायरेक्ट-टू-कंज्यूमर डिजिटल ट्रांसफॉर्मेशन',
    clientSectorEn: 'Handloom & Ethnic Apparel (Jaipur, Rajasthan)',
    clientSectorHi: 'हैंडलूम व एथनिक परिधान (जयपुर, राजस्थान)',
    deliverablesEn: [
      'Custom Shopify 2.0 storefront with responsive mobile layout',
      'Integration of Razorpay UPI / Netbanking gateway',
      'Automated Shiprocket courier tracking webhooks',
      'Server-side Meta Conversions API (CAPI) configuration',
    ],
    deliverablesHi: [
      'कस्टम शॉपिफाई 2.0 स्टोरफ्रंट रेस्पॉन्सिव मोबाइल लेआउट के साथ',
      'रेज़रपे UPI और नेटबैंकिंग गेटवे इंटीग्रेशन',
      'ऑटोमेटेड शिपरॉकेट कूरियर ट्रैकिंग वेबहुक',
      'सर्वर-साइड मेटा कन्वर्जन्स API (CAPI) कॉन्फ़िगरेशन',
    ],
    techStack: ['Shopify Liquid', 'Tailwind CSS', 'Razorpay SDK', 'Meta CAPI', 'Shiprocket API'],
    summaryEn: 'Architected a mobile-first digital storefront replacing fragmented offline catalog orders with structured online checkout and inventory sync.',
    summaryHi: 'ऑफ़लाइन कैटलॉग ऑर्डर्स की जगह संरचित ऑनलाइन चेकआउट और इन्वेंट्री सिंक के साथ एक आधुनिक मोबाइल-फर्स्ट स्टोरफ्रंट तैयार किया।',
    outcomesEn: [
      'Automated 100% of order confirmation and dispatch notices via WhatsApp API',
      'Eliminated manual spreadsheet order entry errors',
      'Achieved sub-2.2 second mobile page loads across Indian 4G/5G networks',
    ],
    outcomesHi: [
      'व्हाट्सएप API के ज़रिए 100% आर्डर कन्फर्मेशन और डिस्पैच अलर्ट्स स्वचालित',
      'मैन्युअल स्प्रेडशीट डेटा एंट्री की गलतियों का पूर्ण निवारण',
      'भारतीय 4G/5G नेटवर्क पर 2.2 सेकंड से कम समय में पेज लोड गति',
    ],
  },
  {
    id: 'cs_healthcare_booking',
    titleEn: 'Multi-specialty Clinic Appointment & WhatsApp Automation System',
    titleHi: 'मल्टी-स्पेशियलिटी क्लिनिक अपॉइंटमेंट व व्हाट्सएप ऑटोमेशन सिस्टम',
    clientSectorEn: 'Healthcare & Diagnostics (Delhi NCR)',
    clientSectorHi: 'हेल्थकेयर व डायग्नोस्टिक्स (दिल्ली NCR)',
    deliverablesEn: [
      'Doctor schedule calendar with real-time slot reservation',
      'Official Meta WhatsApp Business Cloud API automated bot',
      'Digital diagnostic test report PDF delivery pipeline',
      'Reception staff management dashboard',
    ],
    deliverablesHi: [
      'डॉक्टर शेड्यूल कैलेंडर रियल-टाइम स्लॉट रिजर्वेशन के साथ',
      'ऑफिशियल मेटा व्हाट्सएप बिजनेस क्लाउड API बॉट',
      'डिजिटल लैब टेस्ट रिपोर्ट PDF डिलीवरी पाइपलाइन',
      'रिसेप्शन स्टाफ मैनेजमेंट एडमिन कंसोल',
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Meta Cloud API', 'Node.js', 'AWS S3'],
    summaryEn: 'Engineered an automated appointment reservation and diagnostic report distribution workflow to reduce telephone congestion at the clinic front desk.',
    summaryHi: 'क्लिनिक रिसेप्शन पर फोन कॉल की भीड़ कम करने के लिए स्वचालित अपॉइंटमेंट और लैब रिपोर्ट वितरण वर्कफ़्लो तैयार किया गया।',
    outcomesEn: [
      'Over 60% of routine appointment requests handled autonomously via WhatsApp bot',
      'Instant digital report delivery reduced front-desk inquiry calls significantly',
      'Secure encrypted PDF distribution compliant with basic data hygiene',
    ],
    outcomesHi: [
      '60% से अधिक सामान्य अपॉइंटमेंट अनुरोध व्हाट्सएप बॉट द्वारा स्वचालित रूप से बुक',
      'तुरंत डिजिटल रिपोर्ट डिलीवरी से रिसेप्शन पूछताछ में भारी कमी',
      'सुरक्षित एन्क्रिप्टेड PDF वितरण',
    ],
  },
  {
    id: 'cs_b2b_logistics_portal',
    titleEn: 'B2B Cargo Fleet Management & Quotation Portal',
    titleHi: 'B2B कार्गो फ्लीट मैनेजमेंट व कोटेशन पोर्टल',
    clientSectorEn: 'Intercity Logistics & Transport (Gurugram / Haryana)',
    clientSectorHi: 'लॉजिस्टिक्स व ट्रांसपोर्टेशन (गुरुग्राम / हरियाणा)',
    deliverablesEn: [
      'Customer quote estimation engine for intercity freight routes',
      'Driver assignment and load dispatch dashboard',
      'SMS & WhatsApp status milestone updates',
      'GST tax invoice automated PDF generation',
    ],
    deliverablesHi: [
      'इंटर-सिटी फ्रेट रूट्स के लिए कस्टमर कोटेशन एस्टीमेशन इंजन',
      'ड्राइवर असाइनमेंट व लोड डिस्पैच डैशबोर्ड',
      'SMS व व्हाट्सएप स्टेटस अपडेट्स',
      'GST टैक्स इनवॉइस ऑटोमेटेड PDF जेनरेशन',
    ],
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    summaryEn: 'Replaced paper-based consignment notes and unstructured WhatsApp messages with a unified web portal for corporate consignment bookings.',
    summaryHi: 'कागजी बिल्टी और अनौपचारिक संदेशों की जगह कॉर्पोरेट बुकिंग के लिए एक एकीकृत वेब पोर्टल स्थापित किया।',
    outcomesEn: [
      'Reduced turnaround time for freight quotes from hours to under 3 minutes',
      'Centralized tracking across 40+ active intercity freight vehicles',
      'Direct GST compliant invoice downloads for corporate accounting teams',
    ],
    outcomesHi: [
      'फ्रेट कोटेशन का समय घंटों से घटाकर 3 मिनट से भी कम किया',
      '40+ इंटर-सिटी कार्गो वाहनों की एकीकृत ट्रैकिंग',
      'कॉर्पोरेट अकाउंटिंग के लिए तुरंत GST इनवॉइस डाउनलोड सुविधा',
    ],
  },
];
