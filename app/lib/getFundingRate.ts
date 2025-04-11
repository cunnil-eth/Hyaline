"use server"

import { Hyperliquid } from 'hyperliquid';
import { tokens } from './tokens';
import type { Token } from './tokens';

const hyperliquid = new Hyperliquid({
    enableWs: true,
    privateKey: process.env.PRIVATE_KEY,
    testnet: true
});

async function calculateFundingRate(tokenName: string, intervalDays: number) {
  const intervalMillis = intervalDays * 24 * 60 * 60 * 1000;
  const startTime = Date.now() - intervalMillis;

  const fundingHistory = await hyperliquid.info.perpetuals.getFundingHistory(
    `${tokenName}-PERP`,
    startTime
  );

  if (!fundingHistory || fundingHistory.length === 0) {
    console.warn(`No funding history for ${tokenName} in ${intervalDays} day period.`);
    return "N/A";
  }

  const totalFundingRate = fundingHistory.reduce((sum, entry) => {
    return sum + parseFloat(entry.fundingRate);
  }, 0);

  const averageFundingRate = totalFundingRate / fundingHistory.length;

  const annualizedFundingRate = averageFundingRate * 100 * 365;

  return `${annualizedFundingRate.toFixed(2)}%`;
}
  
export async function fetchAndUpdateTokens() {
  const intervals = {
    "1d": 1, 
    "7d": 7,
    "30d": 30,
  };

  const updatedTokens: Token[] = await Promise.all(
    tokens.map(async (token) => {
      try {
        const apr = await Promise.all(
          Object.entries(intervals).map(async ([key, days]) => {
            const fundingRate = await calculateFundingRate(token.name, days);
            return { [key]: fundingRate };
          })
        );

        token.apr = apr.reduce((acc, intervalApr) => {
          return { ...acc, ...intervalApr };
        }, {});

        return token; 
      } catch (err : unknown) {
        const error = err as Error;
        console.error(`Failed to fetch APR for ${token.name}:`, error.message);
        return token; 
      }
    })
  );

  return updatedTokens;
}
  
  