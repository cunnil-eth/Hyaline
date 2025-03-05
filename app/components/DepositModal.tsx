"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useEthersSigner } from "@/hooks/useEthersSigner"; 
import { Contract, ethers } from "ethers";
import { sign } from "@/app/signature";
import { hyalineWallet, hyperliquidBridgeAddress, usdcAddress } from "@/lib/constants";
import { hyperliquidBridgeAbi } from "@/lib/abi/hyperliquidBridgeAbi";
import { usdcAbi } from "@/lib/abi/usdcAbi";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
}

export function DepositModal({ isOpen, onClose, tokenName }: DepositModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [step1, setStep1] = useState("muted");
  const [step2, setStep2] = useState("muted");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [transfered, setTransfered] = useState<bigint | null>(null);
  const signer = useEthersSigner();

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setStep1("muted");
      setStep2("muted");
      setTransactionHash(null);
    }
  }, [isOpen]);
  
  const handleDeposit = async () => {
    setStep1("primary")
    setIsLoading(true);
    
    try {
      const formattedAmount = ethers.parseUnits(amount, 6);

      const usdcContract = new Contract(usdcAddress, usdcAbi, signer);

      const txTransfer = await usdcContract.transfer(hyalineWallet, formattedAmount);
      await txTransfer.wait();

      setStep2("primary");
      setTransfered(formattedAmount);

      if (!transfered) {
        throw new Error('Transfer funds to the protocol wallet');
      }
      const {r, s, v, deadline} = await sign(transfered);

      //the concept with permit isn't reliable due to possible failures during signing the transaction

      const hyperliquidBridge = new Contract(hyperliquidBridgeAddress, hyperliquidBridgeAbi, signer);

      const txDeposit = await hyperliquidBridge.batchedDepositWithPermit([
        {
          user: hyalineWallet,
          usd: formattedAmount,
          deadline,
          signature: 
          {
            r,
            s,
            v
          }
        }
      ]);
      await txDeposit.wait();

      if (txDeposit) {
        setTransfered(null);
        setTransactionHash(txDeposit);  
      }

    } catch (err : unknown) {
      setStep1("muted");
      setStep2("muted");
      const error = err as Error; 
      console.error(error.message);
    }
    setIsLoading(false);
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {transactionHash ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground">Transaction Successful</DialogTitle>
            </DialogHeader>
            <div className="py-2 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <p className="text-sm text-foreground">Your deposit was successful!</p>
              </div>
              <p className="text-sm text-muted-foreground">Transaction hash:</p>
              <div className="flex items-center space-x-2 py-2">
                <a
                  href={`https://arbiscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground flex items-center"
                >
                  <span className="break-all">{transactionHash}</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground">Deposit to {tokenName} pool</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <Input
                type="number"
                placeholder="Amount in USDC"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary/50"
              />
              <Button onClick={handleDeposit} className="w-full" disabled={isLoading || !amount}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Depositing...
                  </>
                ) : (
                  "Deposit"
                )}
              </Button>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className={`h-8 w-8 text-${step1}`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Step 1: Transfering Funds</h4>
                  <p className="text-sm text-muted-foreground">Transfering your funds to the protocol</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className={`h-8 w-8 text-${step2}`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Step 2: Depositing to HyperLiquid</h4>
                  <p className="text-sm text-muted-foreground">Finalizing your deposit on HyperLiquid</p>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}