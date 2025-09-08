"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

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
                className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wider mb-6"
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
                    className="bg-[#161932]/60 backdrop-blur-sm border border-[#ffffff15] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fe6d4c]/5 to-[#f59b50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fe6d4c]/20 to-[#f59b50]/20 mb-4 group-hover:from-[#fe6d4c]/30 group-hover:to-[#f59b50]/30 transition-all duration-300">
                            <svg className="w-7 h-7 text-[#fe6d4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
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
                                className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
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
                    className="bg-[#161932]/60 backdrop-blur-sm border border-[#ffffff15] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fe6d4c]/5 to-[#f59b50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fe6d4c]/20 to-[#f59b50]/20 mb-4 group-hover:from-[#fe6d4c]/30 group-hover:to-[#f59b50]/30 transition-all duration-300">
                            <svg className="w-7 h-7 text-[#f59b50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
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
                                className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
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
                    className="bg-[#161932]/60 backdrop-blur-sm border border-[#ffffff15] rounded-2xl p-5 text-center group relative overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fe6d4c]/5 to-[#f59b50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fe6d4c]/20 to-[#f59b50]/20 mb-4 group-hover:from-[#fe6d4c]/30 group-hover:to-[#f59b50]/30 transition-all duration-300">
                            <svg className="w-7 h-7 text-[#fe6d4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
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
                                className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
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
                <Shield className="w-4 h-4 text-green-400" />
                <span>Trusted by 5,000+ crypto investors worldwide</span>
            </motion.div>
        </motion.div>
    )
}

export default QuickAssurance