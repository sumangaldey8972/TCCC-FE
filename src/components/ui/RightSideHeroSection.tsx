"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

interface Props {
    logo: string
}

const RightSideHeroSection = ({ logo }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            setIsMobile(width < 768)
            setIsTablet(width >= 768 && width < 1024)
        }

        // Initial check
        checkScreenSize()

        // Add event listener
        window.addEventListener('resize', checkScreenSize)

        // Clean up
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex flex-col items-center justify-center"
        >
            <motion.div className="relative z-10 w-full flex justify-center">
                <Image
                    src={logo}
                    alt="Coin Cartel Logo"
                    width={600}
                    height={600}
                    className="drop-shadow-2xl max-w-full h-auto"
                    priority
                    style={{
                        maxWidth: isMobile ? '80%' : isTablet ? '70%' : '100%',
                        marginTop: isMobile ? '2rem' : '0'
                    }}
                />
            </motion.div>

            {/* Text elements container - Responsive positioning */}
            <motion.div
                className="flex flex-col items-center mt-4 md:mt-6 w-full max-w-lg"
                style={{
                    position: isMobile || isTablet ? 'relative' : 'absolute',
                    bottom: isMobile || isTablet ? 'auto' : '15%',
                    marginTop: isMobile ? '-1rem' : isTablet ? '-2rem' : '0'
                }}
            >
                {/* CARTEL ONLY - Top centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-red-500 font-bold text-xl md:text-2xl lg:text-3xl mb-2 md:mb-4 text-center"
                    style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 0px #000, 0px 0px 8px rgba(255, 0, 0, 0.8)"
                    }}
                >
                    CARTEL ONLY
                </motion.div>

                {/* Middle row with two elements */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2 md:gap-4 lg:gap-8">
                    {/* Built by real dezens - Left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-orange-500 font-bold text-lg md:text-xl lg:text-2xl text-center"
                        style={{
                            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            textShadow: "2px 2px 0px #000, 0px 0px 8px rgba(254, 109, 76, 0.8)"
                        }}
                    >
                        BUILT BY REAL DEZENS
                    </motion.div>

                    {/* CRYPTO GANG - Right side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-yellow-400 font-bold text-lg md:text-xl lg:text-2xl text-center"
                        style={{
                            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            textShadow: "2px 2px 0px #000, 0px 0px 8px rgba(255, 215, 0, 0.8)"
                        }}
                    >
                        CRYPTO GANG
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RightSideHeroSection