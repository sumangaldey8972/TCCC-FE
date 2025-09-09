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
                                <span className="block text-white bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">
                                    JOIN THE CRYPTO CARTEL
                                </span>
                                <span className="block mt-4 text-xl md:text-2xl text-red-600">
                                    ONLY <span className="text-yellow-500">{remainingSpots}</span> SPOTS LEFT
                                </span>
                            </motion.h2>

                            <p className="text-gray-400 max-w-xl mx-auto text-lg font-medium uppercase tracking-wide">
                                Get in before we close the gates. This ain&apos;t for everyone.
                            </p>
                        </div>

                        {/* Progress bar showing spots taken - styled like ammo count */}
                        <div className="max-w-md mx-auto mb-10">
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span className="flex items-center">
                                    <Zap size={16} className="mr-2 text-yellow-500" />
                                    {100 - remainingSpots}/100 FILLED
                                </span>
                                <span className="flex items-center">
                                    {remainingSpots} REMAINING
                                    <Skull size={16} className="ml-2 text-red-600" />
                                </span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-red-700 to-yellow-600 rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${100 - remainingSpots}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* CTA Button with aggressive styling */}
                        <div className="flex justify-center">
                            <motion.button
                                onClick={() => {
                                    const pricingSection = document.getElementById('pricing');
                                    if (pricingSection) {
                                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="group relative bg-black hover:bg-red-900 border-2 border-yellow-500 hover:border-red-600 text-white font-bold text-lg py-4 px-10 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 overflow-hidden uppercase tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center justify-center relative z-10">
                                    <Shield className="w-5 h-5 mr-3 text-yellow-500" />
                                    ENTER THE UNDERWORLD
                                    <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" />
                                </span>

                                {/* Button shine effect */}
                                <div className="absolute inset-0 -skew-x-12 overflow-hidden">
                                    <div className="absolute inset-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
                                </div>

                                {/* Red glow on hover */}
                                <div className="absolute inset-0 rounded-md bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </motion.button>
                        </div>

                        {/* Trust badges with gangsta style */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-gray-800">
                            <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center mr-3">
                                    <Skull size={16} className="text-white" />
                                </div>
                                NO RATS ALLOWED
                            </div>
                            <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center mr-3">
                                    <Gem size={16} className="text-white" />
                                </div>
                                BLOOD-BOUND SECURITY
                            </div>
                            <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-wide">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                    <Zap size={16} className="text-yellow-500" />
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