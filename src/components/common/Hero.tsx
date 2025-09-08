"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Users, Star, Zap, TrendingUp, Wallet, Sparkles, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import QuickAssurance from "./QuickAssurance";
import RightSideHeroSection from "../ui/RightSideHeroSection";

interface HeroProps {
    logo: string;
}

const Hero = ({ logo }: HeroProps) => {
    const [isConnected, setIsConnected] = useState(false)
    const [showParticles, setShowParticles] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)

    const handleWalletConnect = () => {
        setIsConnected(!isConnected);
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 2000);
    };


    // Floating particles animation
    const Particle = ({ size, positionX, positionY, delay }: {
        size: number;
        positionX: number;
        positionY: number;
        delay: number
    }) => (
        <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50]"
            style={{
                width: size,
                height: size,
                left: positionX,
                top: positionY,
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
        <section id="home" className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">

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
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[#fe6d4c]/10 text-[#fe6d4c] text-sm font-medium mb-6"
                    >
                        <TrendingUp size={14} className="mr-1" /> Exclusive Crypto Community
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
                    >
                        Join{" "}
                        <span className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                            The Coin Cartel
                        </span>{" "}
                        Community
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-300 mb-8"
                    >
                        Join the most trusted crypto community. Get real-time market insights, early alpha calls, and exclusive VIP perks — all secured by your own wallet.
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
                        {/* VIP Access Button */}
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.a
                                className="hidden bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 group relative overflow-hidden"
                                onClick={() => {
                                    const pricingSection = document.getElementById('pricing');
                                    if (pricingSection) {
                                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                <span className="relative z-10">Get VIP Access Now</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </motion.a>
                        </motion.div>

                        {/* Telegram Channel Button */}
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.a
                                href="https://t.me/THE_CARTEL_COMMUNITY" // Replace with your actual Telegram channel URL
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-[#0088cc] to-[#00a8e8] text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 group relative overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                <span className="relative z-10">Join Telegram</span>
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <MessageCircle size={20} /> {/* You may need to import this icon or use a different one */}
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
                                onClick={handleWalletConnect}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 20px rgba(254, 109, 76, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all relative overflow-hidden ${isConnected
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                    : "bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white"
                                    }`}
                            >
                                {/* Connection status indicator */}
                                <div className={`absolute left-3 w-2 h-2 rounded-full ${isConnected ? "bg-white" : "bg-white/60"}`}></div>

                                <Wallet size={20} />
                                <span>{isConnected ? "Connected" : "Connect Wallet"}</span>
                                {isConnected && <Sparkles size={16} className="ml-1" />}

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
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
                        className="flex flex-wrap items-center mt-10 gap-6 text-gray-400"
                    >
                        <div className="flex items-center">
                            <Users className="mr-2 text-[#f59b50]" size={20} />
                            <span>5000+ Members</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="mr-2 text-[#f59b50]" size={20} />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center">
                            <Zap className="mr-2 text-[#f59b50]" size={20} />
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