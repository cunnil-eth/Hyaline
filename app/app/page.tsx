"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import MetricsBar from "@/components/MetricsBar";
import TokenGrid from "@/components/TokenGrid";
import DepositModal from "@/components/DepositModal";
import Background from "@/components/Background";

export default function Home() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  
  const handleDeposit = (tokenName: string) => {
    setSelectedToken(tokenName);
    setIsDepositModalOpen(true);
  };

  return (
    <>
      <Background />
      <div className="relative flex flex-col flex-grow">
        <main className="container mx-auto px-4 py-8 flex-grow">
          <MetricsBar 
            main={true}
          />
          <TokenGrid 
            onDeposit={handleDeposit}
          />
        </main>
        <Footer />
      </div>
      <DepositModal 
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        tokenName={selectedToken}
      />
    </>
  );
}