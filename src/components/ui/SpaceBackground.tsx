import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Space background with matte colors
export const SpaceBackground = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Simplified static version for SSR */}
                {/* <div className="absolute rounded-full" style={{
                    width: 100,
                    height: 100,
                    right: '10%',
                    top: '10%',
                    background: 'radial-gradient(circle at 30% 30%, #FFD700, #FF8C00, #FF4500, #8B0000)',
                }} /> */}
                <div className="absolute rounded-full" style={{
                    width: 90,
                    height: 90,
                    right: '10%',
                    bottom: '10%',
                    background: 'radial-gradient(circle at 30% 30%, #8B0000, #700000, #000000)',
                }} />
                <div className="absolute rounded-full" style={{
                    width: 70,
                    height: 70,
                    left: '50%',
                    top: '40%',
                    background: 'radial-gradient(circle at 30% 30%, #8B0000, #700000, #000000)',
                }} />

                {/* Nebula effects with matte colors */}
                <div className="absolute -left-40 top-1/4 w-80 h-80 bg-[#8B0000] rounded-full filter blur-[100px] opacity-15"></div>
                <div className="absolute -right-40 bottom-1/4 w-80 h-80 bg-[#8B0000] rounded-full filter blur-[100px] opacity-15"></div>
                <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#333333] rounded-full filter blur-[100px] opacity-10"></div>
            </div>
        )
    }

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {/* Stars with matte effect */}
            {[...Array(150)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gray-500"
                    style={{
                        width: Math.random() * 8,
                        height: Math.random() * 8,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 1 + 0.7,
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Animated planets with matte colors */}
            {/* <motion.div
                className="absolute rounded-full sun-glow"
                style={{
                    width: 100,
                    height: 100,
                    right: '10%',
                    top: '10%',
                    background: 'radial-gradient(circle at 30% 30%, #FFD700, #FF8C00, #FF4500, #8B0000)',
                }}
                animate={{
                    y: [0, -15, 0],
                    rotate: 360,
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00]"></div>
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`solar-particle-${i}`}
                        className="absolute rounded-full bg-[#FF8C00]"
                        style={{
                            width: 4,
                            height: 4,
                            left: '50%',
                            top: '50%',
                            marginLeft: -2,
                            marginTop: -2,
                        }}
                        animate={{
                            rotate: 360,
                            x: [0, 80 * Math.cos((i * 45 * Math.PI) / 180)],
                            y: [0, 80 * Math.sin((i * 45 * Math.PI) / 180)]
                        }}
                        transition={{
                            rotate: {
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            x: {
                                duration: 8 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            y: {
                                duration: 8 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    />
                ))}
            </motion.div> */}

            {/* Mooon Planet */}
            <motion.div
                className="absolute rounded-full moon-glow"
                style={{
                    width: 120,
                    height: 120,
                    right: '10%',
                    top: '10%',
                    background: 'radial-gradient(circle at 30% 30%, #e6e6e6, #a6a6a6, #666666, #4d4d4d)',
                    boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(255, 255, 255, 0.2)',
                }}
                animate={{
                    y: [0, -10, 0],
                    rotate: -360,
                    scale: [1, 1.03, 1]
                }}
                transition={{
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {/* Moon glow effect */}
                <div className="absolute inset-0 rounded-full opacity-30" style={{
                    boxShadow: '0 0 80px 30px rgba(255, 255, 255, 0.4)'
                }}></div>
            </motion.div>

            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 90,
                    height: 90,
                    right: '10%',
                    bottom: '10%',
                    background: 'radial-gradient(circle at 30% 30%, #8B0000, #700000, #000000)',
                    boxShadow: '0 0 30px rgba(139, 0, 0, 0.5)',
                }}
                animate={{
                    y: [0, -20, 0],
                    rotate: 360,
                }}
                transition={{
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-160 h-4 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50 rounded-full transform rotate-45"></div>
                </div>
            </motion.div>

            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 70,
                    height: 70,
                    left: '50%',
                    top: '40%',
                    background: 'radial-gradient(circle at 30% 30%, #8B0000, #700000, #000000)',
                    boxShadow: '0 0 30px rgba(139, 0, 0, 0.5)',
                }}
                animate={{
                    y: [0, -10, 0],
                    rotate: 360,
                }}
                transition={{
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-160 h-4 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50 rounded-full transform rotate-45"></div>
                </div>
            </motion.div>

            {/* Nebula effects with matte colors */}
            <div className="absolute -left-40 top-1/4 w-80 h-80 bg-[#8B0000] rounded-full filter blur-[100px] opacity-15"></div>
            <div className="absolute -right-40 bottom-1/4 w-80 h-80 bg-[#8B0000] rounded-full filter blur-[100px] opacity-15"></div>
            <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#333333] rounded-full filter blur-[100px] opacity-10"></div>

            <style jsx global>{`
        .sun-glow {
          box-shadow: 
            0 0 60px rgba(255, 215, 0, 0.8),
            0 0 100px rgba(255, 140, 0, 0.6),
            0 0 140px rgba(255, 69, 0, 0.4),
            0 0 180px rgba(139, 0, 0, 0.2);
          filter: blur(0.5px);
        }
        
        .sun-glow::before {
          content: '';
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulseGlow 3s infinite alternate;
        }
        
        @keyframes pulseGlow {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
        </div>
    )
}