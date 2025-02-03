"use client";

import { Waves } from "@/components/ui/waves-background";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#03261f" }}>
      {/* Waves Background */}
      <div className="absolute inset-0">
        <Waves
          lineColor="rgba(255, 255, 255, 0.2)"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Logo */}
      <div className="absolute top-3 left-6 flex items-center gap-2 z-20">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 invert" />
        <span className="text-white text-xl font-semibold">Hyaline</span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <main className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            DeFi has never been this easy
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-12">
            Discover a world of a delta-neutral strategy built on top of the most popular Perp DEX
          </p>
          <button 
            className="px-8 py-3 bg-white text-black font-medium rounded-lg transition-all duration-300 hover:bg-transparent hover:text-white border border-white"
          >
            Explore
          </button>
        </main>
      </div>
    </div>
  );
};

export default Index;