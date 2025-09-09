"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Users, Heart } from "lucide-react"

const QuickAssurance = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 w-full max-w-3xl"
        >
            {/* Section Title */}
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center silver-embossed-text text-sm font-semibold uppercase tracking-wider mb-6 m-auto"
                style={{ fontSize: '2rem' }}
            >
                Why Trust The Coin Cartel?
            </motion.h3>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Wallet-Secured Login Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#121212] border border-[#333] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/5 to-[#bf953f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8B0000]/20 mb-4 group-hover:bg-[#8B0000]/30 transition-all duration-300">
                            <Lock className="w-7 h-7 text-[#8B0000]" />
                        </div>

                        {/* Title */}
                        <h4 className="text-white font-semibold mb-2 text-lg">Wallet-Secured Login</h4>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed">You own your data - no emails, no passwords, just your wallet</p>

                        {/* Animated checkmark */}
                        <div className="mt-4 flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.1, type: "spring" }}
                                className="w-6 h-6 rounded-full bg-[#bf953f]/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-[#bf953f]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* 100% Non-Custodial Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#121212] border border-[#333] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/5 to-[#bf953f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#bf953f]/20 mb-4 group-hover:bg-[#bf953f]/30 transition-all duration-300">
                            <Shield className="w-7 h-7 text-[#bf953f]" />
                        </div>

                        {/* Title */}
                        <h4 className="text-white font-semibold mb-2 text-lg">100% Non-Custodial</h4>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed">Your funds stay with you - we never hold your assets</p>

                        {/* Animated checkmark */}
                        <div className="mt-4 flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="w-6 h-6 rounded-full bg-[#bf953f]/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-[#bf953f]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Community-First Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#121212] border border-[#333] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/5 to-[#bf953f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8B0000]/20 mb-4 group-hover:bg-[#8B0000]/30 transition-all duration-300">
                            <Users className="w-7 h-7 text-[#8B0000]" />
                        </div>

                        {/* Title */}
                        <h4 className="text-white font-semibold mb-2 text-lg">Community-First</h4>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed">No spam, no shilling, no fake news - just quality insights</p>

                        {/* Animated checkmark */}
                        <div className="mt-4 flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.3, type: "spring" }}
                                className="w-6 h-6 rounded-full bg-[#bf953f]/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-[#bf953f]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Additional Trust Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex items-center justify-center mt-8 space-x-2 text-gray-500 text-sm"
            >
                <Heart className="w-4 h-4 text-[#8B0000]" />
                <span>Trusted by 5,000+ crypto investors worldwide</span>
            </motion.div>
        </motion.div>
    )
}

export default QuickAssurance