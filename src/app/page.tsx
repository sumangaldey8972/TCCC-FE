"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/coin_cartel_logo.png";

// Lazy load components
const Navbar = lazy(() => import("@/components/common/Navbar"));
const Hero = lazy(() => import("@/components/common/Hero"));
const ValueProposition = lazy(() => import("@/components/common/ValueProposition"))
const SecuritySection = lazy(() => import("@/components/common/SecuritySection"))
const FinalCTA = lazy(() => import("@/components/common/FinalCTA"))


// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#161932]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-[#fe6d4c] border-t-transparent rounded-full"
    />
  </div>
);

export default function Home() {

  return (
    <div className="bg-[#161932] min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar logo={logo.src} />
        <Hero logo={logo.src} />
        <ValueProposition />
        <SecuritySection />
        <FinalCTA />
      </Suspense>
    </div>
  );
}