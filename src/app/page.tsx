"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useAccount } from "wagmi";
import logo from "@/assets/logo_svg.png";
import DexScreenerWidget from "@/components/DexScreener/DexScreenerWidget";
import { useAppKit } from "@reown/appkit/react";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/common/Hero";

const ValueProposition = lazy(() => import("@/components/common/ValueProposition"));
const SecuritySection = lazy(() => import("@/components/common/SecuritySection"));
const FinalCTA = lazy(() => import("@/components/common/FinalCTA"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#1e2022]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-[#fe6d4c] border-t-transparent rounded-full"
    />
  </div>
);

const soundSrc = "/sounds/mixkit-gold-coin-prize-1999.wav"; // Your wallet sound

export default function Home() {
  const globalAudioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const prevConnectedRef = useRef<boolean>(false);

  const { isConnected, address } = useAccount();
  const [playWalletSound] = useSound(soundSrc, { volume: 0.8, interrupt: true });
  const { open } = useAppKit();

  console.log({ address })

  // Preload global audio and manage automatic click sounds
  useEffect(() => {
    const globalAudio = new Audio("/sounds/mixkit-select-click-1109.wav");
    globalAudio.load();
    globalAudioRef.current = globalAudio;

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-no-global-sound]")) return;
      if (!globalAudioRef.current) return;

      if (!audioUnlocked) {
        try {
          await globalAudioRef.current.play();
          globalAudioRef.current.pause();
          globalAudioRef.current.currentTime = 0;
          setAudioUnlocked(true);
        } catch {
          console.log("Global sound blocked");
        }
      }

      globalAudioRef.current.currentTime = 0;
      globalAudioRef.current.play().catch(console.error);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [audioUnlocked]);

  // Trigger particles and sound once when connection status changes from false → true
  useEffect(() => {
    const justConnected = !prevConnectedRef.current && isConnected;
    prevConnectedRef.current = isConnected;

    if (justConnected) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 2000);
      playWalletSound();
    }
  }, [isConnected, playWalletSound]);

  const handleWalletConnect = () => open();

  return (
    <div className="bg-[#1e2022] min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar
          logo={logo.src}
          isConnected={isConnected}
          showParticles={showParticles}
          handleWalletConnect={handleWalletConnect}
        />
        <Hero
          logo={logo.src}
          isConnected={isConnected}
          showParticles={showParticles}
          handleWalletConnect={handleWalletConnect}
        />
        <ValueProposition />
        <DexScreenerWidget />
        <SecuritySection />
        <FinalCTA />
      </Suspense>
    </div>
  );
}
