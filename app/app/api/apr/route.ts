'use server';

import { NextResponse } from 'next/server';
import { fetchAndUpdateTokens } from "@/lib/getFundingRate";
import type { Token } from '@/lib/tokens';

let cachedTokens: Token[] | null = null;
let lastUpdated = 0;
const CACHE_DURATION = 86400000;

export async function GET() {
    const now = Date.now();

    if (!cachedTokens || (now - lastUpdated) > CACHE_DURATION) {
        try {
          cachedTokens = await fetchAndUpdateTokens();
          lastUpdated = now;
        } catch (err) {
          const error = err as Error;
          console.error("Error updating tokens APR:", error);
          return NextResponse.json({ error: `Internal server error: ${error.message}` }, {status: 500});
        }
      }
    
    return NextResponse.json({ tokens: cachedTokens }, {status: 200});
}
