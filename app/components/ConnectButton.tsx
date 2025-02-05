"use client";

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';

export function ConnectButton() {
    return (
      <RainbowConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} className="bg-primary text-white hover:bg-primary/90">
                      Connect
                    </Button>
                  );
                }

                if (chain.unsupported) {
                    return (
                      <Button onClick={openChainModal}
                        variant="secondary"
                        className="bg-secondary text-white"
                      >
                        Wrong network
                      </Button>
                    );
                }    
  
                return (
                  <Button 
                    onClick={openAccountModal}
                    variant="secondary"
                    className="bg-secondary text-white"
                  >
                    {account.displayName}
                  </Button>
                );
              })()}
            </div>
          );
        }}
      </RainbowConnectButton.Custom>
    );
}