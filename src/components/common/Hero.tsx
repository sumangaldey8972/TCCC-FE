"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Users, Star, Zap, Wallet, Sparkles, MessageCircle, Crown } from "lucide-react";
import { useRef } from "react";
import QuickAssurance from "./QuickAssurance";
import RightSideHeroSection from "../ui/RightSideHeroSection";
import { SpaceBackground } from "../ui/SpaceBackground";

interface HeroProps {
    logo: string;
    isConnected: boolean;
    handleWalletConnect: () => void;
    showParticles: boolean
}

const Hero = ({ logo, isConnected, handleWalletConnect, showParticles }: HeroProps) => {
    const buttonRef = useRef<HTMLDivElement>(null)

    // Floating particles animation
    const Particle = ({ size, positionX, positionY, delay }: {
        size: number;
        positionX: number;
        positionY: number;
        delay: number
    }) => (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                left: positionX,
                top: positionY,
                background: "linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
                duration: 1.5,
                delay,
                ease: "easeOut",
            }}
        />
    );



    return (
        <section id="home" className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#0A0A0A]">

            {/* Space background */}
            <SpaceBackground />

            {/* Subtle texture for matte effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHJlY3Qwd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMEEwQTBBIj48L3JlY3Q+CiAgPHBhdGggZD0iTTAgMEw2MCA2ME02MCAwTDAgNjAiIHN0cm9rZT0iIzEyMTIxMiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-30 z-0"></div>

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                {/* Hero Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[#8B0000] text-gray-200 text-sm font-medium mb-6 border border-[#700000]"
                    >
                        <Crown size={14} className="mr-1" /> Exclusive Crypto Cartel
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                    >
                        <span className="silver-embossed-text">Join</span>{" "}
                        <span className="gold-embossed-text">
                            The Coin Cartel
                        </span>{" "}
                        <span className="silver-embossed-text">Community</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-300 mb-8"
                    >
                        Join the most <span className="font-bold text-[#bf953f]">elite crypto cartel</span>. Get real-time market insights, early alpha calls, and exclusive VIP perks — all secured by your own wallet.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-300 mb-8"
                    >
                        Get early access to meme coin launches, sniper drops & alpha leaks. Built by real degens — not VCs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start"
                    >
                        {/* Telegram Channel Button */}
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.a
                                href="https://t.me/THE_CARTEL_COMMUNITY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 group relative overflow-hidden border-2 border-[#700000] metallic-red-button"
                                whileHover={{
                                    boxShadow: "0 0 20px rgba(139, 0, 0, 0.7)",
                                    y: -2
                                }}
                            >
                                {/* Metallic shine effect */}
                                <div className="absolute inset-0 metallic-shine"></div>

                                {/* Beveled edges */}
                                <div className="absolute inset-0 button-bevel"></div>

                                <span className="relative z-10 text-shadow">JOIN TELEGRAM</span>
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <MessageCircle size={20} className="drop-shadow-md" />
                                </motion.div>
                            </motion.a>
                        </motion.div>

                        {/* Wallet Connect Button */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            ref={buttonRef}
                        >
                            <motion.button
                                data-no-global-sound
                                onClick={handleWalletConnect}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: isConnected ? "0 0 20px rgba(191, 149, 63, 0.7)" : "0 0 20px rgba(139, 0, 0, 0.7)",
                                    y: -2
                                }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-bold transition-all relative overflow-hidden border-2 ${isConnected
                                    ? "bg-gradient-to-b from-[#bf953f] to-[#8B7500] text-[#0A0A0A] border-[#aa771c] metallic-gold-button"
                                    : "bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 border-[#700000] metallic-red-button"
                                    }`}
                            >
                                {/* Metallic shine effect */}
                                <div className="absolute inset-0 metallic-shine"></div>

                                {/* Beveled edges */}
                                <div className="absolute inset-0 button-bevel"></div>

                                {/* Connection status indicator */}
                                <div className={`absolute left-3 w-3 h-3 rounded-full z-10 ${isConnected ? "bg-[#0A0A0A] ring-2 ring-[#FFD700]" : "bg-gray-200 ring-2 ring-[#700000]"}`}></div>

                                <Wallet size={20} className="drop-shadow-md z-10" />
                                <span className="z-10 text-shadow">{isConnected ? "CONNECTED" : "CONNECT WALLET"}</span>
                                {isConnected && <Sparkles size={16} className="ml-1 z-10" fill="#FFD700" />}
                            </motion.button>

                            {/* Particle effects */}
                            <AnimatePresence>
                                {showParticles && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        {[...Array(15)].map((_, i) => (
                                            <Particle
                                                key={i}
                                                size={Math.random() * 8 + 2}
                                                positionX={Math.random() * 100}
                                                positionY={Math.random() * 100}
                                                delay={i * 0.05}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap items-center mt-10 gap-6 text-gray-300"
                    >
                        <div className="flex items-center bg-[#121212] px-3 py-2 rounded-lg border border-[#333]">
                            <Users className="mr-2 text-[#bf953f]" size={20} />
                            <span>5000+ Members</span>
                        </div>
                        <div className="flex items-center bg-[#121212] px-3 py-2 rounded-lg border border-[#333]">
                            <Star className="mr-2 text-[#bf953f]" size={20} />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center bg-[#121212] px-3 py-2 rounded-lg border border-[#333]">
                            <Zap className="mr-2 text-[#bf953f]" size={20} />
                            <span>24/7 Support</span>
                        </div>
                    </motion.div>

                    <QuickAssurance />
                </motion.div>

                {/* Hero Image */}
                <RightSideHeroSection logo={logo} />
            </div>
        </section>
    );
};

export default Hero;