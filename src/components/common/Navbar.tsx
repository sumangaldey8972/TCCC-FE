"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Wallet, Coins, Sparkles, Star, MessageCircle } from "lucide-react";

interface NavbarProps {
    logo: string;
}

const Navbar = ({ logo }: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        async function fetchPrices() {
            try {
                const res = await fetch("/api/crypto");
                const json = await res.json();
                console.log("json", json)
                setData(json);
            } catch (err) {
                console.error("Error fetching prices:", err);
            }
        }

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // refresh every 60 sec
        return () => clearInterval(interval);
    }, []);

    console.log("checking data", data)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-[#0d1020]/95 backdrop-blur-xl py-2 shadow-2xl shadow-[#f59b50]/10"
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

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 gold-shine"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                        />

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
                                {data?.error ? "--" : `$${data?.bitcoin?.usd?.toLocaleString()}`}
                            </span>
                            <span
                                className={`ml-1 ${data?.bitcoin?.change >= 0 ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {data?.error ? "--" : `${data?.bitcoin?.change?.toFixed(2)}%`}
                            </span>
                        </div>
                        <div className="h-4 w-px bg-gray-600"></div>
                        <div className="flex items-center text-sm">
                            <Coins size={14} className="text-[#f59b50] mr-1" />
                            <span className="text-gray-300 mr-1">ETH:</span>
                            <span className="text-green-400 font-medium">
                                {data?.error ? "--" : `$${data?.ethereum?.usd?.toLocaleString()}`}
                            </span>
                            <span
                                className={`ml-1 ${data?.ethereum?.change >= 0 ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {data?.error ? "--" : `${data?.ethereum?.change?.toFixed(2)}%`}
                            </span>
                        </div>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.a
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 25px rgba(254, 109, 76, 0.5)"
                            }}
                            onClick={() => {
                                const pricingSection = document.getElementById('pricing');
                                if (pricingSection) {
                                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center space-x-2 group"
                        >
                            <span>Join VIP</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight size={16} />
                            </motion.div>
                        </motion.a>
                    </motion.div> */}

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
                            className="bg-gradient-to-r from-[#0088cc] to-[#00a8e8] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center space-x-2 group relative overflow-hidden"
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
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${isConnected
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                : "bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white"
                                }`}
                        >
                            <Wallet size={16} />
                            <span>{isConnected ? "Connected" : "Connect Wallet"}</span>
                            {isConnected && <Sparkles size={14} className="ml-1" />}
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
                        {/* Telegram Channel Button - FIXED */}
                        <motion.div
                            className="relative w-11/12"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.a
                                href="https://t.me/THE_CARTEL_COMMUNITY"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-[#0088cc] to-[#00a8e8] text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 group relative overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                                <span className="relative z-10">Join Telegram</span>
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <MessageCircle size={20} />
                                </motion.div>
                            </motion.a>
                        </motion.div>

                        {/* Wallet Connection Button */}
                        <motion.button
                            onClick={handleWalletConnect}
                            whileTap={{ scale: 0.95 }}
                            className={`relative w-11/12 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 overflow-hidden ${isConnected
                                ? "bg-gradient-to-r from-green-500/90 to-emerald-600/90"
                                : "bg-gradient-to-r from-[#fe6d4c]/90 to-[#f59b50]/90"
                                }`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Animated connection status indicator */}
                            <motion.div
                                className={`absolute left-3 w-2 h-2 rounded-full ${isConnected ? "bg-white" : "bg-white/60"}`}
                                animate={{
                                    scale: isConnected ? [1, 1.2, 1] : 1,
                                    opacity: isConnected ? [1, 0.7, 1] : 1
                                }}
                                transition={{ duration: 1.5, repeat: isConnected ? Infinity : 0 }}
                            />

                            <Wallet size={18} />
                            <span>{isConnected ? "Connected" : "Connect Wallet"}</span>

                            {/* Mini crypto icons floating on connection */}
                            {isConnected && (
                                <>
                                    <motion.div
                                        initial={{ scale: 0, y: 10 }}
                                        animate={{ scale: 1, y: 0 }}
                                        className="ml-1 text-xs"
                                    >
                                        ✓
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                                    >
                                        <span className="text-[8px] font-bold text-black">₿</span>
                                    </motion.div>
                                </>
                            )}
                        </motion.button>

                        {/* VIP Button */}
                        <motion.a
                            href="#pricing"
                            whileTap={{ scale: 0.95 }}
                            className="relative w-11/12 bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 rounded-xl font-semibold text-center group overflow-hidden"
                            onClick={() => setMenuOpen(false)}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                <span>Join VIP</span>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center"
                                >
                                    <Star size={10} />
                                </motion.div>
                            </span>
                        </motion.a>

                        {/* Mobile crypto ticker */}
                        <div className="w-3/4 mt-4 pt-4 border-t border-gray-700">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center">
                                    <Coins size={12} className="text-[#f59b50] mr-1" />
                                    <span className="text-gray-400">BTC:</span>
                                    <span className="text-green-400 ml-1">{data?.error ? "--" : `$${data?.bitcoin?.usd?.toLocaleString()}`}</span>
                                </div>
                                <div className="flex items-center">
                                    <Coins size={12} className="text-[#f59b50] mr-1" />
                                    <span className="text-gray-400">ETH:</span>
                                    <span className="text-green-400 ml-1">{data?.error ? "--" : `$${data?.ethereum?.usd?.toLocaleString()}`} </span>
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