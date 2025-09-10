import { ArrowRight, Shield, Skull, Zap, Coins, Gem } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion"

const GangstaCryptoCTA = () => {
    const [remainingSpots, setRemainingSpots] = useState(23);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulate spots being taken
    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingSpots > 15) {
                setRemainingSpots(prev => prev - 1);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [remainingSpots]);

    // Aggressive border animation effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Animation variables
        let animationFrameId: number;
        let time = 0;
        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
        }> = [];

        // Create initial particles
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#ffd700' : '#ffffff'
            });
        }

        const draw = () => {
            time += 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw aggressive border
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff0000';



            // Draw corner skulls
            const drawSkull = (x: number, y: number, size: number) => {
                ctx.save();
                ctx.translate(x, y);

                // Skull shape
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fillStyle = '#000000';
                ctx.fill();
                ctx.strokeStyle = '#ff0000';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Eyes
                ctx.beginPath();
                ctx.arc(-size / 3, -size / 5, size / 4, 0, Math.PI * 2);
                ctx.arc(size / 3, -size / 5, size / 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ff0000';
                ctx.fill();

                // Mouth
                ctx.beginPath();
                ctx.arc(0, size / 4, size / 3, 0, Math.PI);
                ctx.lineWidth = 2;
                ctx.stroke();

                // Teeth
                for (let i = -1; i <= 1; i += 2) {
                    ctx.beginPath();
                    ctx.moveTo(i * size / 6, size / 4);
                    ctx.lineTo(i * size / 6 + size / 12 * Math.sign(i), size / 2);
                    ctx.lineTo(i * size / 6 - size / 12 * Math.sign(i), size / 2);
                    ctx.closePath();
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                }

                ctx.restore();
            };

            // Draw corner skulls
            drawSkull(25, 25, 12);
            drawSkull(canvas.width - 25, 25, 12);
            drawSkull(25, canvas.height - 25, 12);
            drawSkull(canvas.width - 25, canvas.height - 25, 12);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Draw bullet holes
            for (let i = 0; i < 8; i++) {
                const x = i % 2 === 0 ? 40 : canvas.width - 40;
                const y = 60 + (Math.floor(i / 2) * 60);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#333333';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x - 2, y - 2, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = '#000000';
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <section className="relative py-16 md:py-24 px-4 bg-black text-white overflow-hidden" ref={containerRef}>
            {/* Gritty background texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIj48L3JlY3Q+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMTExIiBvcGFjaXR5PSIwLjIiPjwvcmVjdD48L3N2Zz4=')]"></div>

            {/* Blood splatter decorative elements */}
            <div className="absolute top-10 left-10 w-40 h-40 opacity-10">
                <svg viewBox="0 0 100 100">
                    <path d="M30,40 Q40,20 50,30 T70,40 T60,60 T40,70 T30,40" fill="#ff0000" />
                    <path d="M60,30 Q70,15 80,25 T85,40 T70,50 T55,45 T60,30" fill="#ff0000" />
                </svg>
            </div>

            <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 rotate-180">
                <svg viewBox="0 0 100 100">
                    <path d="M30,40 Q40,20 50,30 T70,40 T60,60 T40,70 T30,40" fill="#ff0000" />
                    <path d="M60,30 Q70,15 80,25 T85,40 T70,50 T55,45 T60,30" fill="#ff0000" />
                </svg>
            </div>

            {/* Animated money falling in background */}
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

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Gangsta CTA Content with Aggressive Border */}
                <div className="relative bg-gradient-to-b from-[#111111] to-[#0A0A0A] rounded-lg p-8 md:p-12 border-2 border-[#333333] shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Animated border canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    />

                    {/* Inner content */}
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold mb-6 uppercase"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <span className="block text-white bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-red-800 to-amber-600">
                                    JOIN THE CRYPTO CARTEL
                                </span>
                            </motion.h2>

                            <p className="text-gray-400 max-w-xl mx-auto text-lg font-medium uppercase tracking-wide mb-8">
                                Get in before we close the gates. This ain&apos;t for everyone.
                            </p>

                            {/* Exclusive Offer Section */}
                            <motion.div
                                className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-stone-900 border-2 border-amber-500 rounded-xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto"
                                style={{
                                    boxShadow: "0 0 15px rgba(180, 130, 50, 0.4)",
                                    backgroundImage: "radial-gradient(circle at top right, rgba(120, 0, 0, 0.3), rgba(30, 30, 30, 0.7)), linear-gradient(to bottom, rgb(30, 30, 30), rgb(10, 10, 10))"
                                }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {/* Decorative elements */}
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider border border-amber-300">
                                    🔥 Exclusive Limited Offer
                                </div>

                                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(255, 195, 45, 0.8)" }}></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-amber-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(255, 195, 45, 0.8)" }}></div>

                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300">
                                        FOUNDING MEMBER ACCESS
                                    </span>
                                </motion.h3>

                                <motion.p
                                    className="text-lg text-gray-200 mb-6 leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    For our first <span className="text-amber-400 font-bold" style={{ textShadow: "0 0 5px rgba(255, 195, 45, 0.7)" }}>100 elite members</span> only:
                                    <br />
                                    <span className="text-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                                        Full Access Subscription at $99
                                    </span>
                                    <br />
                                    <span className="text-amber-200 text-sm">(One week only - then price increases permanently)</span>
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Trust badges with metallic style */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-amber-800/30">
                            <div className="flex items-center text-amber-200 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-900 to-amber-700 flex items-center justify-center mr-3 border border-amber-600">
                                    <Skull size={16} className="text-amber-100" />
                                </div>
                                NO RATS ALLOWED
                            </div>
                            <div className="flex items-center text-amber-200 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center mr-3 border border-amber-400">
                                    <Gem size={16} className="text-amber-100" />
                                </div>
                                BLOOD-BOUND SECURITY
                            </div>
                            <div className="flex items-center text-amber-200 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-amber-700 flex items-center justify-center mr-3 border border-amber-500">
                                    <Zap size={16} className="text-amber-200" />
                                </div>
                                LIGHTNING TRANSACTIONS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with gangsta style */}
                <footer className="mt-16 pt-10 border-t border-gray-800 border-opacity-50">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-red-700 to-yellow-600 flex items-center justify-center mr-3">
                                    <Skull size={16} className="text-white" />
                                </div>
                                <span className="text-gray-500 text-sm font-bold">© 2025 CRYPTO CARTEL. ALL RIGHTS RESERVED.</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-bold uppercase">
                                BLOOD PACT
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-bold uppercase">
                                TERRITORY
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors text-sm font-bold uppercase">
                                CONTACT THE BOSS
                            </a>
                        </div>

                        <div className="flex space-x-4 mt-6 md:mt-0">
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default GangstaCryptoCTA;