"use client";

import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { ConnectButton } from "./ConnectButton";

interface NavbarProps {
  isConnected: boolean;
  onConnect: () => void;
}

export default function Navbar() {
  return (
    <nav className="bg-[rgb(15,26,31)] backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-8 flex-1">
            <div className="flex items-center">
              <MobileMenu />
              <h1 className="text-xl font-bold text-white md:block hidden">Hyaline</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/markets" className="text-white/70 hover:text-white transition-colors">
                Markets
              </Link>
              <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
          <ConnectButton />
          {/* <Button
            onClick={onConnect}
            variant={isConnected ? "secondary" : "default"}
            className={`${isConnected ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-primary/90'} md:w-auto`}
          >
            {isConnected ? '0x1234...5678' : 'Connect'}
          </Button> */}
        </div>
      </div>
    </nav>
  );
}