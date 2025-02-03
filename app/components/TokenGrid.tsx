"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { fetchAndUpdateTokens } from "@/lib/getFundingRate";
import Image from "next/image";


interface TokenGridProps {
  onDeposit: (tokenName: string) => void;
}

export default function TokenGrid({ onDeposit }: TokenGridProps) {
  const signer = useEthersSigner();
  const [tokens, setTokens] = useState<any[]>([]);
  
  useEffect(() => {
    fetchAndUpdateTokens().then((updatedTokens) => {
      setTokens(updatedTokens);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokens.map((token) => (
        <div key={token.name} className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={token.image}
              alt={token.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <h3 className="text-lg font-semibold text-foreground">{token.name}</h3>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">1D APR</span>
              <span className="font-medium text-foreground">{token.apr["1d"]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">7D APR</span>
              <span className="font-medium text-foreground">{token.apr["7d"]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">30D APR</span>
              <span className="font-medium text-foreground">{token.apr["30d"]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">TVL</span>
              <span className="font-medium text-foreground">{token.tvl}</span>
            </div>
          </div>
          
          <Button 
            onClick={() => onDeposit(token.name)}
            className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!signer}
          >
            {signer ? 'Deposit' : 'Connect Wallet to Deposit'}
          </Button>
        </div>
      ))}
    </div>
  );
}