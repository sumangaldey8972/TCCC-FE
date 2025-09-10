"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Wallet } from "lucide-react";
import useSound from "use-sound";

const soundSrc = "/sounds/mixkit-gold-coin-prize-1999.wav";

export default function ConnectButton() {
    const { open } = useAppKit();
    const { isConnected } = useAccount();

    const [showParticles, setShowParticles] = useState(false);
    const prevConnectedRef = useRef(isConnected);

    const [play] = useSound(soundSrc, {
        volume: 0.3,
        interrupt: true,
    });

    // Trigger effects when connection status changes from false → true
    useEffect(() => {
        const justConnected = !prevConnectedRef.current && isConnected;
        prevConnectedRef.current = isConnected;

        if (justConnected) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 2000);
            play();
        }
    }, [isConnected, play]);

    // Particle component
    const Particle = ({
        size,
        positionX,
        positionY,
        delay,
    }: {
        size: number;
        positionX: number;
        positionY: number;
        delay: number;
    }) => (
        <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50]"
            style={{ width: size, height: size, left: positionX, top: positionY }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
    );

    const handleClick = () => open();

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <motion.button
                onClick={handleClick}
                whileHover={{
                    scale: 1.05,
                    boxShadow: isConnected
                        ? "0 0 20px rgba(191, 149, 63, 0.7)"
                        : "0 0 20px rgba(139, 0, 0, 0.7)",
                    y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold transition-all relative overflow-hidden border-2 ${isConnected
                    ? "bg-gradient-to-b from-[#bf953f] to-[#8B7500] text-[#0A0A0A] border-[#aa771c] metallic-gold-button"
                    : "bg-gradient-to-b from-[#8B0000] to-[#600000] text-gray-200 border-[#700000] metallic-red-button"
                    }`}
            >
                <div className="absolute inset-0 metallic-shine"></div>
                <div className="absolute inset-0 button-bevel"></div>

                <Wallet size={20} className="drop-shadow-md z-10" />
                <span className="z-10 text-shadow">
                    {isConnected ? "CONNECTED" : "CONNECT WALLET"}
                </span>
                {isConnected && <Sparkles size={16} className="ml-1 z-10" fill="#FFD700" />}
            </motion.button>

            <AnimatePresence>
                {showParticles && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
    );
}
