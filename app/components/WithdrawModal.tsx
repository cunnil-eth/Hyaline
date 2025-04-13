"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  availBalance: number;
}

type WithdrawStatus = 'idle' | 'loading' | 'success';

export default function WithdrawModal({ isOpen, onClose, tokenName, availBalance }: WithdrawModalProps) {
  const [status, setStatus] = useState<WithdrawStatus>('idle');
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleWithdraw = async () => {
    setStatus('loading');
    // Simulate withdrawal process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTxHash('0x1234...5678'); // This would be the actual transaction hash
    setStatus('success');
  };
  
  const handleClose = () => {
    if (status === 'success') {
      setStatus('idle');
      setAmount("");
      setTxHash("");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw USDC</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {status !== 'success' && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span>{availBalance} USDC</span>
                </div>
                <Input
                  type="number"
                  placeholder={`Amount`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>
              <Button 
                onClick={handleWithdraw} 
                className="w-full"
                disabled={status === 'loading' || !amount || Number(amount) <= 0  || availBalance < Number(amount)}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Withdrawing...
                  </>
                ) : (
                  "Withdraw"
                )}
              </Button>
            </>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-primary">
                <CheckCircle2 className="h-8 w-8" />
                <span className="text-lg font-medium">Withdrawal Successful!</span>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-medium">{amount} USDC</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Transaction</span>
                  <Link 
                    href={`https://arbiscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary hover:text-primary/80"
                  >
                    <span className="text-sm">View</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              <Button 
                onClick={handleClose}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}