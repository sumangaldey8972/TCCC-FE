"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet, Coins, Sparkles, MessageCircle } from "lucide-react";
import { CryptoData } from "@/app/api/crypto/route";

interface NavbarProps {
    logo: string;
    isConnected: boolean;
    handleWalletConnect: () => void;
    showParticles: boolean
}

const Navbar = ({ logo, isConnected, handleWalletConnect, showParticles }: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<CryptoData | null>(null)

    useEffect(() => {
        async function fetchPrices() {
            try {
                const res = await fetch("/api/crypto");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error fetching prices:", err);
            }
        }

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // refresh every 60 sec
        return () => clearInterval(interval);
    }, []);

    // console.log("checking data", data)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-[#1e1e1e]/95 backdrop-blur-xl py-2 shadow-2xl shadow-[#f59b50]/10"
                : "bg-transparent py-4"
                }`}
        >
            {/* Animated border gradient */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fe6d4c] to-transparent"></div>

            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <motion.div
                    className="flex items-center space-x-3 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={logo}
                            alt="Coin Cartel Logo"
                            width={50}
                            height={50}
                            className="rounded-lg drop-shadow-glow"
                            priority
                        />
                    </motion.div>
                    <motion.h1
                        className="text-xl md:text-2xl font-bold relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="relative z-10 gold-embossed">
                            The Coin Cartel
                        </span>
                        <style jsx>{`
    .gold-embossed {
      background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 
        1px 1px 0px rgba(0,0,0,0.3),
        -1px -1px 0px rgba(255,255,255,0.2);
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .gold-shine {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      height: 100%;
      width: 60%;
      transform: skewX(-20deg);
      z-index: 5;
    }
  `}</style>
                    </motion.h1>
                </motion.div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center space-x-4">
                    {/* Animated crypto price ticker */}
                    <motion.div
                        className="hidden xl:flex items-center space-x-6 px-4 py-2 rounded-lg bg-[#ffffff08] border border-[#ffffff15]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >

                        <div className="flex items-center text-sm">
                            <Coins size={14} className="text-[#f59b50] mr-1" />
                            <span className="text-gray-300 mr-1">BTC:</span>
                            <span className="text-green-400 font-medium">
                                {data ? `$${data?.bitcoin?.usd?.toLocaleString()}` : "--"}
                            </span>
                            <span
                                className={`ml-1 ${data && data?.bitcoin?.change >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                                {data ? `${data?.bitcoin?.change?.toFixed(2)}%` : "--"}
                            </span>
                        </div>

                        <div className="h-4 w-px bg-gray-600"></div>

                        <div className="flex items-center text-sm">
                            <Coins size={14} className="text-[#f59b50] mr-1" />
                            <span className="text-gray-300 mr-1">ETH:</span>
                            <span className="text-green-400 font-medium">
                                {data ? `$${data?.ethereum?.usd?.toLocaleString()}` : "--"}
                            </span>
                            <span
                                className={`ml-1 ${data && data?.ethereum?.change >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                                {data ? `${data?.ethereum?.change?.toFixed(2)}%` : "--"}
                            </span>
                        </div>
                    </motion.div>


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
                            className="bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center justify-center space-x-2 group relative overflow-hidden border-2 border-[#700000] metallic-red-button"
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

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        ref={buttonRef}
                    >
                        <motion.button
                            data-no-global-sound // 👈 Add this attribute
                            onClick={handleWalletConnect}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: isConnected ? "0 0 20px rgba(191, 149, 63, 0.7)" : "0 0 20px rgba(139, 0, 0, 0.7)",
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold transition-all relative overflow-hidden border-2 ${isConnected
                                ? "bg-gradient-to-b from-[#bf953f] to-[#8B7500] text-[#0A0A0A] border-[#aa771c] metallic-gold-button"
                                : "bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 border-[#700000] metallic-red-button"
                                }`}
                        >
                            {/* Metallic shine effect */}
                            <div className="absolute inset-0 metallic-shine"></div>

                            {/* Beveled edges */}
                            <div className="absolute inset-0 button-bevel"></div>

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


                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    className="lg:hidden text-white p-2 rounded-lg bg-[#ffffff10] border border-[#ffffff20]"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#0d1020] border-t border-[#f59b50]/30 flex flex-col items-center space-y-4 py-6 text-white font-medium"
                    >

                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.a
                                href="https://t.me/THE_CARTEL_COMMUNITY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 px-5 py-2.5 rounded-xl font-bold flex items-center justify-center space-x-2 group relative overflow-hidden border-2 border-[#700000] metallic-red-button"
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
                                    boxShadow: isConnected ? "0 0 20px rgba(191, 149, 63, 0.7)" : "0 0 20px rgba(139, 0, 0, 0.7)",
                                    y: -2
                                }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold transition-all relative overflow-hidden border-2 ${isConnected
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

                        {/* Mobile crypto ticker */}
                        <div className="hidden w-3/4 mt-4 pt-4 border-t border-gray-700">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center">
                                    <Coins size={12} className="text-[#f59b50] mr-1" />
                                    <span className="text-gray-400">BTC:</span>
                                    <span className="text-green-400 ml-1">{data ? `$${data?.bitcoin?.usd?.toLocaleString()}` : "--"}</span>
                                </div>
                                <div className="flex items-center">
                                    <Coins size={12} className="text-[#f59b50] mr-1" />
                                    <span className="text-gray-400">ETH:</span>
                                    <span className="text-green-400 ml-1">{data ? `$${data?.ethereum?.usd?.toLocaleString()}` : "--"} </span>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;