"use client";

import { useState } from "react";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import Footer from "@/components/Footer";
import MetricsBar from "@/components/MetricsBar";
import TokenTable from "@/components/TokenTable";
import WithdrawModal from "@/components/WithdrawModal";
import Background from "@/components/Background";

export default function Dashboard() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedBalance, setSelectedBalance] = useState(0);
  const signer = useEthersSigner();
  const address = signer?.address;
  
  const handleWithdraw = (tokenName: string, tokenBalance: number) => {
    setSelectedToken(tokenName);
    setSelectedBalance(tokenBalance);
    setIsWithdrawModalOpen(true);
  };

  return (
    <>
      <Background />
      <div className="relative flex flex-col flex-grow">
        <main className="container mx-auto px-4 py-8 flex-grow">
        {!signer ? (
          <div className="text-center py-12 px-96">
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <p className="text-2xl font-bold text-white">Connect your wallet</p>
            </div>
          </div>
        ) : ( <>
          <MetricsBar
            main={false}
            address={address} 
          />
          <TokenTable
            address={address}
            onWithdraw={handleWithdraw}
          />
        </>)}
        </main>
        <Footer />
      </div>
      <WithdrawModal 
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        tokenName={selectedToken}
        availBalance={selectedBalance}
      />
    </>
  );
}
