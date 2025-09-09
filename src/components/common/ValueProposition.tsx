import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    BarChart3,
    Key,
    Bell,
    Users,
    Coins
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface FeatureCardProps {
    feature: Feature;
    index: number;
    isVisible: boolean;
}

const ValueProposition = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    useEffect(() => {
        setIsVisible(inView);
    }, [inView]);

    const features: Feature[] = [
        {
            icon: <BarChart3 size={28} />,
            title: "LIVE MARKET DATA",
            description: "Real-time BTC, ETH, SOL charts with DexScreener integration"
        },
        {
            icon: <Key size={28} />,
            title: "WALLET-SECURED ACCESS",
            description: "MetaMask/Phantom login - no emails, no leaks"
        },
        {
            icon: <Bell size={28} />,
            title: "EARLY ALPHA CALLS",
            description: "New projects & airdrops before the masses"
        },
        {
            icon: <Users size={28} />,
            title: "CURATED COMMUNITY",
            description: "High-signal updates, no noise"
        }
    ];

    return (
        <section ref={ref} className="relative py-20 px-4 overflow-hidden bg-[#0A0A0A] text-white">

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-500 text-xl"
                        initial={{ y: -50, x: Math.random() * 100 + 'vw', rotate: 0 }}
                        animate={{
                            y: '100vh',
                            rotate: 360,
                            transition: {
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        <Coins size={24} className="text-yellow-500" />
                    </motion.div>
                ))}
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 animate-pulse">💰</div>
                <div className="absolute top-40 right-20 animate-pulse delay-300">💎</div>
                <div className="absolute bottom-20 left-1/4 animate-pulse delay-700">🪙</div>
                <div className="absolute bottom-40 right-1/3 animate-pulse delay-1000">📈</div>
            </div>

            {/* Geometric shapes */}
            <div className="absolute -top-20 -left-20 w-40 h-40 border-4 border-[#bf953f] opacity-20 rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 border-4 border-[#8B0000] opacity-20 rotate-45"></div>

            {/* Floating crypto coins */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{ y: Math.random() * 100, x: Math.random() * 100, rotate: Math.random() * 360 }}
                    animate={{
                        y: [null, (Math.random() - 0.5) * 30],
                        rotate: 360,
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        opacity: 0.3
                    }}
                >
                    <Coins size={20} color="#bf953f" />
                </motion.div>
            ))}

            {/* Gangsta-style decorative elements */}
            <div className="absolute top-10 left-5 md:left-10 opacity-20">
                <div className="text-4xl md:text-6xl">♛</div>
            </div>
            <div className="absolute bottom-10 right-5 md:right-10 opacity-20">
                <div className="text-4xl md:text-6xl">♚</div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#bf953f] opacity-30"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#8B0000] opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#bf953f] opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#8B0000] opacity-30"></div>

            {/* Decorative bars */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>

            {/* Pulse orbs */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-[#bf953f] rounded-full opacity-20 animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-[#8B0000] rounded-full opacity-20 animate-ping delay-1000"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 px-4"
                >
                    <span className="gold-embossed-text text-xs md:text-5xl">
                        WHY THE CARTEL DOMINATES
                    </span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {/* Decorative divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative mt-16 mb-8 h-1 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent"
                >
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 bg-[#bf953f] rounded-full border-4 border-[#0A0A0A]"></div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }

                .floating-coin {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

// Enhanced FeatureCard component with decorative elements
const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, isVisible }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative bg-[#121212] rounded-xl p-6 border border-[#333] 
                transition-all duration-300 overflow-hidden group"
        >
            {/* Corner decorative elements */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-[#bf953f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#8B0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#8B0000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#bf953f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Simple hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] to-[#bf953f] opacity-0 
                group-hover:opacity-10 transition-opacity duration-300" />

            <div className="relative z-10">
                {/* Icon with clean design */}
                <div className="mb-4 p-3 rounded-lg bg-[#0A0A0A] border border-[#333] 
                    inline-flex group-hover:border-[#bf953f] transition-colors duration-300 relative">
                    <div className="text-[#bf953f] group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                    </div>
                    {/* Tiny decorative dot */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B0000] rounded-full"></div>
                </div>

                {/* Title with better spacing */}
                <h3 className="text-lg md:text-xl font-bold mb-3 uppercase tracking-wide gold-embossed-text ml-2">
                    {feature.title}
                </h3>

                {/* Clean description with improved readability */}
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {feature.description}
                </p>

                {/* Simple underline with decorative ends */}
                <div className="relative mt-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#8B0000] to-[#bf953f] 
                        group-hover:w-16 transition-all duration-300 mx-auto">
                        <div className="absolute -left-1 -top-0.5 w-2 h-2 bg-[#8B0000] rounded-full"></div>
                        <div className="absolute -right-1 -top-0.5 w-2 h-2 bg-[#bf953f] rounded-full"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ValueProposition;