import React, { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Key, EyeOff, Server, Cpu, Zap, Database, Code2, Heart } from 'lucide-react';

const SecuritySection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

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

        // Shield drawing function
        const drawShield = (x: number, y: number, size: number, opacity: number, isFilled: boolean = false) => {
            ctx.beginPath();
            ctx.moveTo(x, y - size);
            ctx.lineTo(x + size * 0.8, y - size * 0.4);
            ctx.lineTo(x + size * 0.8, y + size * 0.4);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x - size * 0.8, y + size * 0.4);
            ctx.lineTo(x - size * 0.8, y - size * 0.4);
            ctx.closePath();

            if (isFilled) {
                ctx.fillStyle = `rgba(254, 109, 76, ${opacity * 0.3})`;
                ctx.fill();
            }

            ctx.strokeStyle = `rgba(254, 109, 76, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        // Draw lock function
        const drawLock = (x: number, y: number, size: number, opacity: number) => {
            // Lock body
            ctx.beginPath();
            ctx.roundRect(x - size / 2, y - size / 3, size, size * 0.67, 5);
            ctx.strokeStyle = `rgba(249, 155, 80, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Lock shackle
            ctx.beginPath();
            ctx.arc(x, y - size / 3, size / 3, Math.PI, 0, false);
            ctx.strokeStyle = `rgba(249, 155, 80, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        // Animation variables
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw multiple shields with varying opacity and position
            const shieldCount = 12;
            for (let i = 0; i < shieldCount; i++) {
                const x = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.5 + i * 0.5));
                const y = canvas.height * (0.5 + 0.3 * Math.cos(time * 0.3 + i * 0.7));
                const size = 30 + 20 * Math.sin(time * 0.4 + i);
                const opacity = 0.2 + 0.1 * Math.sin(time * 0.6 + i);
                const isFilled = i % 3 === 0;

                if (i % 4 === 0) {
                    drawLock(x, y, size, opacity);
                } else {
                    drawShield(x, y, size, opacity, isFilled);
                }
            }

            // Draw connecting lines between elements
            ctx.beginPath();
            for (let i = 0; i < shieldCount; i++) {
                const x1 = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.5 + i * 0.5));
                const y1 = canvas.height * (0.5 + 0.3 * Math.cos(time * 0.3 + i * 0.7));

                if (i === 0) {
                    ctx.moveTo(x1, y1);
                } else {
                    ctx.lineTo(x1, y1);
                }
            }
            ctx.strokeStyle = 'rgba(254, 109, 76, 0.1)';
            ctx.stroke();

            // Draw random security particles
            for (let i = 0; i < 20; i++) {
                const x = canvas.width * Math.random();
                const y = canvas.height * Math.random();
                const size = 1 + Math.random() * 2;
                const opacity = 0.3 + Math.random() * 0.3;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(254, 109, 76, ${opacity})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isClient]);

    const securityFeatures = [
        {
            icon: <Lock size={28} />,
            title: "Non-Custodial Security",
            description: "We never hold your funds or private keys. Your assets remain securely in your wallet at all times with full self-custody."
        },
        {
            icon: <EyeOff size={28} />,
            title: "Zero-Knowledge Proofs",
            description: "Advanced cryptographic techniques ensure your activity and holdings remain private while verifying membership."
        },
        {
            icon: <Server size={28} />,
            title: "Decentralized Infrastructure",
            description: "Built on distributed nodes with no single point of failure, ensuring maximum uptime and resistance to attacks."
        }
    ];

    const trustIndicators = [
        {
            icon: <Code2 size={18} />,
            text: "Open-source smart contracts"
        },
        {
            icon: <Zap size={18} />,
            text: "Multi-chain compatibility"
        },
        {
            icon: <Database size={18} />,
            text: "Regular security audits"
        },
        {
            icon: <Cpu size={18} />,
            text: "Hardware security module integration"
        },
        {
            icon: <Heart size={18} />,
            text: "Community bug bounty program"
        },
        {
            icon: <Shield size={18} />,
            text: "Insurance fund protection"
        }
    ];

    const stats = [
        { value: "100%", label: "Uptime Record" },
        { value: "$0", label: "Funds Ever Lost" },
        { value: "24/7", label: "Security Monitoring" },
        { value: "1000+", label: "Protected Wallets" }
    ];

    return (
        <section className="relative py-20 px-4 overflow-hidden bg-[#161932] text-white">
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-30"
            />

            {/* Gradient overlays */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#fe6d4c] to-transparent opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#f59b50] to-transparent opacity-10 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#fe6d4c] to-[#f59b50] mb-8 relative">
                        <Shield size={40} className="text-white" />
                        {/* Animated rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#fe6d4c] opacity-0 animate-ping"></div>
                        <div className="absolute inset-2 rounded-full border-2 border-[#f59b50] opacity-0 animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                            Military-Grade Security
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Your security is our top priority. We've built an impregnable fortress around your data and assets
                        with cutting-edge cryptography and decentralized technology. Sleep well knowing your crypto is protected
                        by the most advanced security measures in the industry.
                    </p>
                </div>

                {/* Stats section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-6 border border-[#2a2e4a] text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-gray-300 mt-2">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Security features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="group relative bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] hover:border-[#fe6d4c] transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fe6d4c] bg-opacity-10 mb-6 text-[#1e1e1e]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional trust indicators */}
                <div className="bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] mb-16">
                    <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                        Trust & Transparency
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trustIndicators.map((indicator, index) => (
                            <div key={index} className="flex items-center p-4 bg-[#0f1326] rounded-lg border border-[#2a2e4a]">
                                <div className="text-[#fe6d4c] mr-3">
                                    {indicator.icon}
                                </div>
                                <span className="text-gray-300">{indicator.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security commitment */}
                <div className="text-center bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a]">
                    <Key size={48} className="mx-auto text-[#f59b50] mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Our Security Commitment</h3>
                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We believe security should be transparent, robust, and continuously evolving. Our team of security
                        experts works around the clock to protect our community from emerging threats. Regular audits,
                        bug bounties, and community oversight ensure we maintain the highest security standards in the industry.
                    </p>
                    {/* <button className="mt-6 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        View Security Audit Report
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default SecuritySection; 