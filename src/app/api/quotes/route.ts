import { NextResponse } from 'next/server';
import { z } from 'zod';
import { QuoteRecord } from '@/lib/types';
import { INITIAL_QUOTES } from '@/data/store';
import { generateQuoteNumber } from '@/lib/utils';

const runtimeQuotes: QuoteRecord[] = [...INITIAL_QUOTES];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: runtimeQuotes,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const quoteNumber = body.quoteNumber || generateQuoteNumber();
    const newQuote: QuoteRecord = {
      id: body.id || `quote_${Date.now()}`,
      quoteNumber,
      createdAt: body.createdAt || new Date().toISOString(),
      validUntil: body.validUntil || new Date(Date.now() + 15 * 86400000).toISOString(),
      status: body.status || 'draft',
      customer: body.customer || {
        name: 'Client',
        company: 'Company',
        email: 'client@example.com',
        phone: '',
        city: '',
        industry: '',
      },
      projectName: body.projectName || 'New Project Scope',
      assignedMember: body.assignedMember || 'Futureix Lead',
      language: body.language || 'en',
      state: body.state,
      calculation: body.calculation,
      version: body.version || 1,
    };

    runtimeQuotes.unshift(newQuote);

    return NextResponse.json({
      success: true,
      message: 'Quotation saved successfully',
      quote: newQuote,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to save quotation',
      },
      { status: 500 }
    );
  }
}
