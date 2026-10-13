import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateEnquiryRef } from '@/lib/utils';
import { EnquiryRecord } from '@/lib/types';
import { INITIAL_ENQUIRIES } from '@/data/store';

const EnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  city: z.string().optional(),
  serviceCategory: z.string().min(1, 'Service category is required'),
  budgetRange: z.string().default('₹25,000–₹75,000'),
  timeline: z.string().default('Within 30 days'),
  description: z.string().optional(),
  preferredLanguage: z.enum(['en', 'hi']).default('en'),
  consent: z.boolean().refine((val) => val === true, 'Consent is required'),
});

// In-memory runtime cache for server-side persistence in API requests
const runtimeEnquiries: EnquiryRecord[] = [...INITIAL_ENQUIRIES];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: runtimeEnquiries,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = EnquirySchema.parse(body);

    const ref = generateEnquiryRef();
    const newRecord: EnquiryRecord = {
      id: `enq_${Date.now()}`,
      referenceId: ref,
      createdAt: new Date().toISOString(),
      name: validated.name,
      businessName: validated.businessName || '',
      email: validated.email,
      phone: validated.phone,
      city: validated.city || '',
      serviceCategory: validated.serviceCategory,
      budgetRange: validated.budgetRange,
      timeline: validated.timeline,
      description: validated.description || '',
      preferredLanguage: validated.preferredLanguage,
      status: 'new',
    };

    runtimeEnquiries.unshift(newRecord);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      referenceId: ref,
      enquiry: newRecord,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
