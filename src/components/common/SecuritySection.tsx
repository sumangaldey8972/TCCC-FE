import React, { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Key, EyeOff, Server, Cpu, Zap, Database, Code2, Heart, Bitcoin, Coins, Link, Network } from 'lucide-react';

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
                ctx.fillStyle = `rgba(191, 149, 63, ${opacity * 0.3})`;
                ctx.fill();
            }

            ctx.strokeStyle = `rgba(191, 149, 63, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        // Draw lock function
        const drawLock = (x: number, y: number, size: number, opacity: number) => {
            // Lock body
            ctx.beginPath();
            ctx.roundRect(x - size / 2, y - size / 3, size, size * 0.67, 5);
            ctx.strokeStyle = `rgba(139, 0, 0, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Lock shackle
            ctx.beginPath();
            ctx.arc(x, y - size / 3, size / 3, Math.PI, 0, false);
            ctx.strokeStyle = `rgba(139, 0, 0, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        // Draw bitcoin symbol
        const drawBitcoin = (x: number, y: number, size: number, opacity: number) => {
            ctx.beginPath();
            ctx.font = `${size}px Arial`;
            ctx.fillStyle = `rgba(247, 147, 26, ${opacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('₿', x, y);
        };

        // Draw chain links
        const drawChain = (x: number, y: number, size: number, opacity: number) => {
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(192, 192, 192, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x + size, y, size / 2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.rect(x, y - 1, size, 2);
            ctx.stroke();
        };

        // Animation variables
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw multiple security elements with varying opacity and position
            const elementCount = 15;
            for (let i = 0; i < elementCount; i++) {
                const x = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.5 + i * 0.5));
                const y = canvas.height * (0.5 + 0.3 * Math.cos(time * 0.3 + i * 0.7));
                const size = 30 + 20 * Math.sin(time * 0.4 + i);
                const opacity = 0.2 + 0.1 * Math.sin(time * 0.6 + i);
                const isFilled = i % 3 === 0;

                if (i % 5 === 0) {
                    drawLock(x, y, size, opacity);
                } else if (i % 5 === 1) {
                    drawBitcoin(x, y, size, opacity);
                } else if (i % 5 === 2) {
                    drawChain(x, y, size, opacity);
                } else {
                    drawShield(x, y, size, opacity, isFilled);
                }
            }

            // Draw connecting lines between elements
            ctx.beginPath();
            for (let i = 0; i < elementCount; i++) {
                const x1 = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.5 + i * 0.5));
                const y1 = canvas.height * (0.5 + 0.3 * Math.cos(time * 0.3 + i * 0.7));

                if (i === 0) {
                    ctx.moveTo(x1, y1);
                } else {
                    ctx.lineTo(x1, y1);
                }
            }
            ctx.strokeStyle = 'rgba(191, 149, 63, 0.1)';
            ctx.stroke();

            // Draw random security particles
            for (let i = 0; i < 25; i++) {
                const x = canvas.width * Math.random();
                const y = canvas.height * Math.random();
                const size = 1 + Math.random() * 2;
                const opacity = 0.3 + Math.random() * 0.3;
                const isRed = Math.random() > 0.7;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = isRed
                    ? `rgba(139, 0, 0, ${opacity})`
                    : `rgba(191, 149, 63, ${opacity})`;
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
            title: "NON-CUSTODIAL SECURITY",
            description: "We never hold your funds or private keys. Your assets remain securely in your wallet at all times with full self-custody."
        },
        {
            icon: <EyeOff size={28} />,
            title: "ZERO-KNOWLEDGE PROOFS",
            description: "Advanced cryptographic techniques ensure your activity and holdings remain private while verifying membership."
        },
        {
            icon: <Server size={28} />,
            title: "DECENTRALIZED INFRASTRUCTURE",
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
        <section className="relative py-20 px-4 overflow-hidden bg-[#0A0A0A] text-white">
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-20"
            />

            {/* Gradient overlays */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#8B0000] to-transparent opacity-15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#bf953f] to-transparent opacity-15 rounded-full blur-3xl"></div>

            {/* Silver gradient */}
            <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-gradient-to-br from-[#c0c0c0] to-transparent opacity-10 rounded-full blur-3xl"></div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-5 md:left-10 opacity-20">
                <div className="text-4xl md:text-6xl">⚔️</div>
            </div>
            <div className="absolute bottom-10 right-5 md:right-10 opacity-20">
                <div className="text-4xl md:text-6xl">🛡️</div>
            </div>

            {/* Crypto decorative elements */}
            <div className="absolute top-20 right-20 opacity-15 rotate-12">
                <Bitcoin size={48} className="text-[#f7931a]" />
            </div>
            <div className="absolute bottom-20 left-20 opacity-15 -rotate-12">
                <Coins size={48} className="text-[#c0c0c0]" />
            </div>
            <div className="absolute top-1/3 left-1/4 opacity-10">
                <Network size={42} className="text-[#8B0000]" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 opacity-10">
                <Link size={42} className="text-[#c0c0c0]" />
            </div>


            {/* Animated floating elements */}
            <div className="absolute top-1/4 left-10 animate-float">
                <div className="w-4 h-4 bg-[#8B0000] rounded-full"></div>
            </div>
            <div className="absolute top-1/2 right-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-6 h-6 bg-gradient-to-r from-[#8B0000] to-[#bf953f] rounded-full"></div>
            </div>
            <div className="absolute bottom-1/3 left-20 animate-float" style={{ animationDelay: '4s' }}>
                <div className="w-5 h-5 bg-[#c0c0c0] rounded-full"></div>
            </div>

            {/* Animated hexagon grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="hexagon-grid animate-pulse-slow"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 transform translate-x-1/2 translate-y-1/2">
                    <div className="hexagon-grid animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>

            {/* Animated radar sweep */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
                <div className="radar-sweep"></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gold-embossed-text1">
                            MILITARY-GRADE SECURITY
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Your security is our top priority. We&apos;ve built an impregnable fortress around your data and assets
                        with cutting-edge cryptography and decentralized technology.
                    </p>
                </div>

                {/* Stats section with red/silver accents */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#121212] rounded-xl p-6 border border-[#333] text-center relative overflow-hidden group hover:border-[#8B0000] transition-all duration-300">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#8B0000] to-[#c0c0c0] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur"></div>
                            <div className="relative z-10">
                                <div className="text-3xl font-bold gold-embossed-text">
                                    {stat.value}
                                </div>
                                <div className="text-gray-300 mt-2 text-sm uppercase tracking-wide">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Security features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="group relative bg-[#121212] rounded-xl p-6 border border-[#333] hover:border-[#bf953f] transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] to-[#bf953f] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0A0A0A] border border-[#333] mb-6 text-[#bf953f] group-hover:border-[#bf953f] transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-wide gold-embossed-text">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional trust indicators */}
                <div className="bg-[#121212] rounded-xl p-8 border border-[#333] mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B0000] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c0c0c0] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <h3 className="text-2xl font-bold text-center mb-8 gold-embossed-text">
                        TRUST & TRANSPARENCY
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trustIndicators.map((indicator, index) => (
                            <div key={index} className="flex items-center p-4 bg-[#0A0A0A] rounded-lg border border-[#333] hover:border-[#8B0000] transition-colors duration-300">
                                <div className="text-[#bf953f] mr-3">
                                    {indicator.icon}
                                </div>
                                <span className="text-gray-300 text-sm">{indicator.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security commitment */}
                <div className="text-center bg-[#121212] rounded-xl p-8 border border-[#333] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] to-[#c0c0c0] opacity-5"></div>
                    <Key size={48} className="mx-auto text-[#bf953f] mb-6 relative z-10" />
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide gold-embossed-text relative z-10">OUR SECURITY COMMITMENT</h3>
                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-sm relative z-10">
                        We believe security should be transparent, robust, and continuously evolving. Our team of security
                        experts works around the clock to protect our community from emerging threats.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SecuritySection;