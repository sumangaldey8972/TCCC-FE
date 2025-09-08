"use client"

import { motion } from "framer-motion"
import Image from "next/image"


interface Props {
    logo: string
}

const RightSideHeroSection = ({ logo }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -2, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -inset-8 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] rounded-3xl blur-xl opacity-20"
            ></motion.div>

            <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
            >
                <Image
                    src={logo}
                    alt="Coin Cartel Logo"
                    width={400}
                    height={400}
                    className="drop-shadow-2xl"
                    priority
                />

                {/* Gangsta Crypto Stamp - #Cartel Only */}
                <motion.div
                    initial={{ scale: 0, rotate: -25, y: 20 }}
                    animate={{ scale: 1, rotate: -12, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 300 }}
                    whileHover={{
                        scale: 1.15,
                        rotate: -15,
                        y: -5,
                        boxShadow: "0 0 25px rgba(255, 0, 0, 0.7)"
                    }}
                    className="absolute -top-6 -right-6 bg-black text-red-500 font-bold px-4 py-3 rounded-lg 
            transform border-4 border-red-500 z-20 overflow-hidden cursor-pointer"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 0px #000, 0px 0px 8px rgba(255, 0, 0, 0.8)"
                    }}
                >
                    <span className="relative z-10">#CARTEL ONLY</span>

                    {/* Blood splatter effect */}
                    <div className="absolute inset-0 opacity-30 z-0">
                        <div className="absolute top-0 left-2 w-3 h-4 bg-red-600 rounded-full"></div>
                        <div className="absolute top-3 right-1 w-4 h-3 bg-red-600 rounded-full"></div>
                        <div className="absolute bottom-1 left-4 w-5 h-2 bg-red-600 rounded-full"></div>
                    </div>

                    {/* Bullet hole */}
                    <div className="absolute top-1 right-2 w-2 h-2 bg-black rounded-full border border-yellow-500"></div>

                    {/* Hover shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%", y: "-100%" }}
                        whileHover={{ x: "200%", y: "200%" }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>

                {/* Built By Real DEZEns Stamp */}
                <motion.div
                    initial={{ scale: 0, rotate: 15, x: -20 }}
                    animate={{ scale: 1, rotate: 8, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 300 }}
                    whileHover={{
                        scale: 1.15,
                        rotate: 5,
                        y: -5,
                        boxShadow: "0 0 25px rgba(254, 109, 76, 0.7)"
                    }}
                    className="absolute -bottom-6 -left-6 bg-black text-orange-500 font-bold px-4 py-3 rounded-lg 
            transform border-4 border-orange-500 z-20 overflow-hidden cursor-pointer"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 0px #000, 0px 0px 8px rgba(254, 109, 76, 0.8)"
                    }}
                >
                    <span className="relative z-10">BUILT BY REAL DEZENS</span>

                    {/* Crypto pattern overlay */}
                    <div className="absolute inset-0 opacity-10 z-0">
                        <div className="absolute top-1 left-2 w-2 h-2 bg-orange-500 rounded-sm"></div>
                        <div className="absolute top-1 right-2 w-2 h-2 bg-orange-500 rounded-sm"></div>
                        <div className="absolute bottom-1 left-2 w-2 h-2 bg-orange-500 rounded-sm"></div>
                        <div className="absolute bottom-1 right-2 w-2 h-2 bg-orange-500 rounded-sm"></div>
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-500 rounded-sm"></div>
                    </div>

                    {/* Blockchain line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

                    {/* Hover shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%", y: "-100%" }}
                        whileHover={{ x: "200%", y: "200%" }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>

                {/* Crypto Gang Stamp */}
                <motion.div
                    initial={{ scale: 0, rotate: -10, y: 20 }}
                    animate={{ scale: 1, rotate: -5, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 300 }}
                    whileHover={{
                        scale: 1.1,
                        rotate: -8,
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.7)"
                    }}
                    className="absolute top-1/2 -right-8 bg-black text-yellow-400 font-bold px-3 py-2 rounded-md 
            transform border-4 border-yellow-400 z-20 overflow-hidden cursor-pointer"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        textShadow: "1px 1px 0px #000, 0px 0px 6px rgba(255, 215, 0, 0.8)"
                    }}
                >
                    <span className="relative z-10 flex items-center">
                        CRYPTO GANG
                        <motion.span
                            animate={{ rotate: [0, 15, 0, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="ml-1"
                        >
                            ₿
                        </motion.span>
                    </span>

                    {/* Gold bar effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

                    {/* Hover shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%", y: "-100%" }}
                        whileHover={{ x: "200%", y: "200%" }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            </motion.div>

            {/* Floating crypto elements around the logo */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] rounded-full z-0"
                    style={{
                        width: i % 2 === 0 ? 16 : 10,
                        height: i % 2 === 0 ? 16 : 10,
                        top: `${10 + (i * 15) % 70}%`,
                        left: `${5 + (i * 20) % 85}%`,
                        opacity: 0.8,
                    }}
                    animate={{
                        y: [0, i % 2 === 0 ? -25 : 25, 0],
                        x: [0, i % 3 === 0 ? -15 : 15, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                    whileHover={{
                        scale: 1.8,
                        opacity: 1,
                        transition: { duration: 0.2 }
                    }}
                />
            ))}

            {/* Animated blockchain connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" preserveAspectRatio="none">
                <motion.path
                    d="M50,80 C100,50 150,100 200,70 C250,40 300,80 350,50"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fe6d4c" />
                        <stop offset="100%" stopColor="#f59b50" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    )
}

export default RightSideHeroSection