import { NextResponse } from 'next/server';
import { MASTER_PRICING_ITEMS } from '@/data/priceCatalogue';
import { PriceItem } from '@/lib/types';

let runtimeCatalogue: PriceItem[] = [...MASTER_PRICING_ITEMS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: runtimeCatalogue,
  });
}

export async function POST(request: Request) {
  try {
    const roleHeader = request.headers.get('x-user-role') || 'viewer';

    // Server-side role check
    if (roleHeader !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden: Administrator privileges required to mutate master pricing catalogue',
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedItem = body.item as PriceItem;

    if (!updatedItem || !updatedItem.id) {
      return NextResponse.json(
        { success: false, error: 'Invalid price item structure' },
        { status: 400 }
      );
    }

    runtimeCatalogue = runtimeCatalogue.map((i) => (i.id === updatedItem.id ? updatedItem : i));

    return NextResponse.json({
      success: true,
      message: 'Catalogue item updated successfully',
      data: runtimeCatalogue,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to update catalogue',
      },
      { status: 500 }
    );
  }
}
