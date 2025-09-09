"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo_svg.png";
import DexScreenerWidget from "@/components/DexScreener/DexScreenerWidget";

// Lazy load components
const Navbar = lazy(() => import("@/components/common/Navbar"));
const Hero = lazy(() => import("@/components/common/Hero"));
const ValueProposition = lazy(() => import("@/components/common/ValueProposition"));
const SecuritySection = lazy(() => import("@/components/common/SecuritySection"));
const FinalCTA = lazy(() => import("@/components/common/FinalCTA"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#1e2022]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-[#fe6d4c] border-t-transparent rounded-full"
    />
  </div>
);

export default function Home() {
  const globalAudioRef = useRef<HTMLAudioElement | null>(null);
  const walletAudioRef = useRef<HTMLAudioElement | null>(null);

  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Preload BOTH sounds on mount
  useEffect(() => {
    const globalAudio = new Audio("/sounds/mixkit-select-click-1109.wav");
    globalAudio.load();
    globalAudioRef.current = globalAudio;

    const walletAudio = new Audio("/sounds/mixkit-gold-coin-prize-1999.wav");
    walletAudio.load();
    walletAudioRef.current = walletAudio;

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-no-global-sound]")) return;

      if (!globalAudioRef.current) return;

      try {
        if (!audioUnlocked) {
          // Unlock global audio first time
          await globalAudioRef.current.play();
          globalAudioRef.current.pause();
          globalAudioRef.current.currentTime = 0;
          setAudioUnlocked(true);
        }

        globalAudioRef.current.currentTime = 0;
        await globalAudioRef.current.play();
      } catch (err) {
        console.log("Global sound blocked:", err);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [audioUnlocked]);

  const playWalletSound = async () => {
    if (!walletAudioRef.current) return;

    try {
      if (!audioUnlocked) {
        // Unlock wallet sound on first click if not already unlocked
        await walletAudioRef.current.play();
        walletAudioRef.current.pause();
        walletAudioRef.current.currentTime = 0;
        setAudioUnlocked(true);
      }

      walletAudioRef.current.currentTime = 0;
      await walletAudioRef.current.play();
    } catch (err) {
      console.log("Wallet sound error:", err);
    }
  };

  const handleWalletConnect = async () => {
    const nextState = !isConnected;

    if (nextState) {
      await playWalletSound();
    }

    setIsConnected(nextState);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 2000);
  };

  return (
    <div className="bg-[#1e2022] min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar
          logo={logo.src}
          isConnected={isConnected}
          handleWalletConnect={handleWalletConnect}
          showParticles={showParticles}
        />
        <Hero
          logo={logo.src}
          isConnected={isConnected}
          handleWalletConnect={handleWalletConnect}
          showParticles={showParticles}
        />
        <ValueProposition />
        <DexScreenerWidget />
        <SecuritySection />
        <FinalCTA />
      </Suspense>
    </div>
  );
}
