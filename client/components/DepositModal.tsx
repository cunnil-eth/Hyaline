"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useEthersSigner } from "@/hooks/useEthersSigner"; 
import { Contract, ethers } from "ethers";
import { transfer } from "@/app/signature";
import { usdcABI } from "@/lib/abi/usdcABI";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
}

export function DepositModal({ isOpen, onClose, tokenName }: DepositModalProps) {
  const HLwallet = "0x547c9Ec286cF6B738047D9D5cd01b6F771F04C6f";
  const usdcContractAddress = "0x1870Dc7A474e045026F9ef053d5bB20a250Cc084" //@note testnet

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [step1, setStep1] = useState("muted");
  const [step2, setStep2] = useState("muted");
  const [deposited, setDeposited] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const signer = useEthersSigner();

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setStep1("muted");
      setStep2("muted");
      setDeposited(false);
      setTransactionHash(null);
    }
  }, [isOpen]);
  
  const handleDeposit = async () => {
    setStep1("primary")
    setIsLoading(true);
    
    try {
      const formattedAmount = ethers.parseUnits(amount, 6);

      const usdcContract = new Contract(usdcContractAddress, usdcABI, signer);
      const txApprove = await usdcContract.approve(HLwallet, formattedAmount);
      await txApprove.wait();

      setStep2("primary");

      if (!signer) {
        throw new Error("Connect wallet!")
      }
      const txHash = await transfer(formattedAmount, signer.address, usdcContractAddress);

      if (txHash) {
        setDeposited(true);
        setTransactionHash(txHash);
      }

      //the concept with permit isn't reliable due to possible failures during signing the transaction

      // const contractHLAddress = "0x279c9462FDba349550b49a23DE27dd19d5891baA"; //@note testnet
      // const contractHL = new Contract(contractHLAddress, HLABI, signer);

      // console.log({r, s, v, deadline})
      // const txDeposit = await contractHL.batchedDepositWithPermit([
      //   {
      //     user: HLwallet,
      //     usd: formattedAmount,
      //     deadline,
      //     signature: 
      //     {
      //       r,
      //       s,
      //       v
      //     }
      //   }
      // ]);
      // await txDeposit.wait();

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
        {deposited && transactionHash ? (
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
                  <h4 className="font-medium text-foreground">Step 1: Approving Funds</h4>
                  <p className="text-sm text-muted-foreground">Approving your funds to the protocol</p>
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