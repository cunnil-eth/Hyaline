"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 -ml-2 md:hidden">
          <Menu className="h-6 w-6 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-card pt-10">
        <nav className="flex flex-col space-y-4">
          <Link 
            href="/markets" 
            className="text-white/70 hover:text-white transition-colors"
          >
            Markets
          </Link>
          <Link 
            href="/dashboard" 
            className="text-white/70 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}