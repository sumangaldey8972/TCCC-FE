import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion"

const ClassyFinalCTA = () => {
    const [remainingSpots, setRemainingSpots] = useState(23);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Simulate spots being taken (for demo purposes)
    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingSpots > 15) {
                setRemainingSpots(prev => prev - 1);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [remainingSpots]);

    // Border animation effect
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

        // Border animation variables
        let animationFrameId: number;
        let time = 0;

        const drawAnimatedBorder = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw animated border
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#fe6d4c');
            gradient.addColorStop(0.5, '#f59b50');
            gradient.addColorStop(1, '#fe6d4c');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#fe6d4c';

            ctx.beginPath();

            // Animate the border with a moving effect
            const pulse = Math.sin(time) * 0.5 + 0.5;
            const offset = pulse * 10;

            // Top border with animation
            ctx.moveTo(offset, 2);
            ctx.bezierCurveTo(
                canvas.width * 0.25, -pulse * 5,
                canvas.width * 0.75, -pulse * 5,
                canvas.width - offset, 2
            );

            // Right border with animation
            ctx.bezierCurveTo(
                canvas.width + pulse * 5, canvas.height * 0.25,
                canvas.width + pulse * 5, canvas.height * 0.75,
                canvas.width - 2, canvas.height - offset
            );

            // Bottom border with animation
            ctx.bezierCurveTo(
                canvas.width * 0.75, canvas.height + pulse * 5,
                canvas.width * 0.25, canvas.height + pulse * 5,
                offset, canvas.height - 2
            );

            // Left border with animation
            ctx.bezierCurveTo(
                -pulse * 5, canvas.height * 0.75,
                -pulse * 5, canvas.height * 0.25,
                2, offset
            );

            ctx.closePath();
            ctx.stroke();

            // Draw subtle particles along the border
            for (let i = 0; i < 5; i++) {
                const pos = (time * 0.2 + i * 0.2) % 1;
                const x = pos * canvas.width;
                const y = 2 + Math.sin(pos * Math.PI * 2) * 5;

                ctx.beginPath();
                ctx.arc(x, y, 1.5 + pulse, 0, Math.PI * 2);
                ctx.fillStyle = '#fe6d4c';
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(drawAnimatedBorder);
        };

        drawAnimatedBorder();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <section className="relative py-16 md:py-24 px-4 bg-[#0A0E23] text-white overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#16193222_1px,transparent_1px),linear-gradient(to_bottom,#16193222_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* Elegant corner accents */}
            <div className="absolute top-0 left-0 w-48 h-48 border-t-2 border-l-2 border-[#fe6d4c] opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 border-b-2 border-r-2 border-[#f59b50] opacity-30"></div>

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Main CTA Content with Animated Border */}
                <div className="relative bg-gradient-to-b from-[#161932] to-[#0D1126] rounded-2xl p-8 md:p-12 border border-[#2A2F4F] shadow-2xl shadow-black/30 overflow-hidden">
                    {/* Animated border canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    />

                    {/* Inner content */}
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-light mb-6">
                                <span className="block text-white">Don't Miss Out.</span>
                                <span className="block mt-2 font-medium">Be One of the First <span className="text-[#fe6d4c]">{remainingSpots}</span> VIPs.</span>
                            </h2>

                            <p className="text-[#B8BAD0] max-w-xl mx-auto text-lg font-light">
                                Join our exclusive community of crypto traders and get early access to premium features.
                            </p>
                        </div>

                        {/* Progress bar showing spots taken */}
                        <div className="max-w-md mx-auto mb-10">
                            <div className="flex justify-between text-sm text-[#8A8DB9] mb-2">
                                <span>{100 - remainingSpots}/100 spots taken</span>
                                <span>{remainingSpots} remaining</span>
                            </div>
                            <div className="h-2 bg-[#2A2F4F] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] rounded-full transition-all duration-700"
                                    style={{ width: `${100 - remainingSpots}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* CTA Button with animated border */}
                        <div className="flex justify-center">
                            <motion.button
                                onClick={() => {
                                    const pricingSection = document.getElementById('pricing');
                                    if (pricingSection) {
                                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="group relative bg-[#161932] hover:bg-[#1D2242] border border-[#2A2F4F] hover:border-[#fe6d4c] text-white font-medium text-lg py-4 px-10 rounded-xl transition-all duration-500 hover:shadow-lg hover:shadow-[#fe6d4c]/20 overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center justify-center relative z-10">
                                    🔗 Connect Wallet & Join Now
                                    <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" />
                                </span>

                                {/* Button border animation */}
                                <div className="absolute inset-0 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 border border-transparent group-hover:border-[#fe6d4c] rounded-xl transition-all duration-700"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                                </div>

                                {/* Button shine effect */}
                                <div className="absolute inset-0 -skew-x-12 overflow-hidden">
                                    <div className="absolute inset-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                            </motion.button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-10 border-t border-[#2A2F4F]">
                            <div className="flex items-center text-[#8A8DB9] text-sm">
                                <svg className="w-5 h-5 mr-2 text-[#fe6d4c]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                </svg>
                                Non-custodial
                            </div>
                            <div className="flex items-center text-[#8A8DB9] text-sm">
                                <svg className="w-5 h-5 mr-2 text-[#fe6d4c]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                Secure
                            </div>
                            <div className="flex items-center text-[#8A8DB9] text-sm">
                                <svg className="w-5 h-5 mr-2 text-[#fe6d4c]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                </svg>
                                Transparent
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-10 border-t border-[#2A2F4F] border-opacity-40">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-sm">A</span>
                                </div>
                                <span className="text-[#8A8DB9] text-sm">© 2025  AlphaCrypto. All rights reserved.</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="text-[#8A8DB9] hover:text-[#fe6d4c] transition-colors text-sm font-light">
                                Terms of Service
                            </a>
                            <a href="#" className="text-[#8A8DB9] hover:text-[#fe6d4c] transition-colors text-sm font-light">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-[#8A8DB9] hover:text-[#fe6d4c] transition-colors text-sm font-light">
                                Contact
                            </a>
                        </div>

                        <div className="flex space-x-4 mt-6 md:mt-0">
                            <a href="#" className="text-[#8A8DB9] hover:text-[#fe6d4c] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default ClassyFinalCTA;