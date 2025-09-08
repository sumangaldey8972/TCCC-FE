"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Shield, MessageSquare, Zap, Users, Star } from "lucide-react";

const Features = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const features = [
        {
            icon: <TrendingUp size={32} />,
            title: "Live Trading Signals",
            description: "Get real-time buy/sell/hold signals for top cryptocurrencies with detailed entry and exit points.",
        },
        {
            icon: <Shield size={32} />,
            title: "Risk Management",
            description: "Learn professional risk management strategies to protect your capital and maximize gains.",
        },
        {
            icon: <MessageSquare size={32} />,
            title: "Private Community",
            description: "Access our exclusive Discord community with 24/7 discussions, AMAs, and expert insights.",
        },
        {
            icon: <Zap size={32} />,
            title: "Fast Alerts",
            description: "Receive instant notifications on market movements, news, and emerging opportunities.",
        },
        {
            icon: <Users size={32} />,
            title: "Expert Mentorship",
            description: "Learn from seasoned traders with proven track records in both bull and bear markets.",
        },
        {
            icon: <Star size={32} />,
            title: "Premium Resources",
            description: "Access exclusive trading guides, market analysis reports, and educational content.",
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="features" className="py-20 bg-[#1d2038] px-4 md:px-8">
            <div className="container mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Features</h2>
                    <p className="text-gray-400 text-lg">
                        Our community offers exclusive tools and resources to help you succeed in the crypto market
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-[#161932] p-6 rounded-2xl border border-[#ffffff10] hover:border-[#f59b50]/30 transition-colors"
                        >
                            <div className="text-[#f59b50] mb-4">{feature.icon}</div>
                            <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;