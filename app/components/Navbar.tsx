"use client";

import { MobileMenu } from "./MobileMenu";
import { ConnectButton } from "./ConnectButton";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[rgb(15,26,31)] backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-8 flex-1">
            <div className="flex items-center gap-2">
              <MobileMenu />
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="invert" />
              <h1 className="text-lg font-semibold text-white md:block hidden">Hyaline</h1>
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
        </div>
      </div>
    </nav>
  );
}