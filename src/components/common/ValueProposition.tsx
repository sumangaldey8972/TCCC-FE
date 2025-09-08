import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    BarChart3,
    Key,
    Bell,
    Users
} from 'lucide-react';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    targetAlpha: number;
}

interface Coin {
    symbol: string;
    name: string;
    price: string;
    change: string;
}

const ValueProposition = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsVisible(inView);
    }, [inView]);

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

        // Particle system
        const particles: Particle[] = [];

        const colors = ['#fe6d4c', '#f59b50', '#161932'];

        // Create particles
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const alpha = 0;
            const targetAlpha = 1;

            particles.push({ x, y, size, speedX, speedY, color, alpha, targetAlpha });
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                // Adjust alpha based on section visibility
                particle.alpha += (particle.targetAlpha - particle.alpha) * 0.05;

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                // Draw particle
                ctx.globalAlpha = particle.alpha;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            // Draw connecting lines
            ctx.strokeStyle = 'rgba(254, 109, 76, 0.1)';
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.globalAlpha = Math.min(particles[i].alpha, particles[j].alpha) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
        };

        animate();

        // Update particle target alpha based on section visibility
        particles.forEach(p => {
            p.targetAlpha = isVisible ? 1 : 0;
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isVisible, isClient]);

    const features: Feature[] = [
        {
            icon: <BarChart3 size={32} />,
            title: "Live Market Data",
            description: "Track BTC, ETH, SOL and trending tokens with real-time charts and volume from DexScreener."
        },
        {
            icon: <Key size={32} />,
            title: "Wallet-Secured Access",
            description: "Sign in with MetaMask or Phantom — no emails, no leaks, no middlemen."
        },
        {
            icon: <Bell size={32} />,
            title: "Early Alpha Calls",
            description: "Get notified about new projects, airdrops, and opportunities before the masses."
        },
        {
            icon: <Users size={32} />,
            title: "Community-First Approach",
            description: "We filter noise — only curated, high-signal updates for our members."
        }
    ];

    return (
        <section ref={ref} className="relative py-20 px-4 overflow-hidden bg-[#161932] text-white">
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-30"
            />

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-[#fe6d4c] to-transparent opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#f59b50] to-transparent opacity-10 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                        💎 Why Crypto Traders Choose Us
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isVisible={isVisible}
                            isClient={isClient}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

// FeatureCard component
interface FeatureCardProps {
    feature: Feature;
    index: number;
    isVisible: boolean;
    isClient: boolean;
}

const FeatureCard = ({ feature, index, isVisible, isClient }: FeatureCardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] 
          transition-all duration-700 overflow-hidden transform-gpu
          ${isVisible && isClient
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-20 opacity-0'
                }`}
            style={{
                transitionDelay: isVisible && isClient ? `${index * 0.1}s` : '0s',
                transform: hovered ? 'translateY(-8px) scale(1.02)' : '',
                boxShadow: hovered
                    ? '0 25px 50px -12px rgba(254, 109, 76, 0.25)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        >
            {/* Animated crypto pattern background */}
            <div className="absolute inset-0 opacity-5">
                <CryptoPatternAnimation isActive={hovered} isClient={isClient} />
            </div>

            {/* Hover effect background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] opacity-0 transition-opacity duration-500 
          ${hovered ? 'opacity-10' : ''}`}></div>

            {/* Animated border effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] rounded-2xl opacity-0 blur-md transition-all duration-500 
          ${hovered ? 'opacity-30' : ''}`}></div>

            <div className="relative z-10 flex flex-col items-start">
                {/* Animated icon */}
                <div className={`mb-6 transform transition-all duration-500 text-[#fe6d4c]
            ${hovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
                    {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                    {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                </p>

                {/* Animated crypto particles on hover */}
                {hovered && isClient && <HoverParticles />}

                {/* Animated underline */}
                <div className={`w-16 h-1 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] mt-6 transform origin-left transition-all duration-700 
            ${hovered ? 'scale-x-125 w-24' : 'scale-x-100'}`}></div>
            </div>
        </div>
    );
};

// CryptoPatternAnimation component
interface CryptoPatternAnimationProps {
    isActive: boolean;
    isClient: boolean;
}

const CryptoPatternAnimation = ({ isActive, isClient }: CryptoPatternAnimationProps) => {
    if (!isClient) return null;

    return (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => {
                const animationStyle = isActive ? {
                    animationName: 'float',
                    animationDuration: `${3 + Math.random() * 2}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.3}s`
                } : {};

                return (
                    <div
                        key={i}
                        className="absolute text-[#fe6d4c] opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: '1.5rem',
                            ...animationStyle
                        }}
                    >
                        {Math.random() > 0.5 ? '₿' : 'Ξ'}
                    </div>
                );
            })}

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
        </div>
    );
};

// HoverParticles component
const HoverParticles = () => {
    return (
        <>
            {[...Array(8)].map((_, i) => {
                const animationDuration = 1.5 + Math.random() * 0.5;

                return (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50]"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0,
                            animation: `particleFloat ${animationDuration}s forwards`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    ></div>
                );
            })}

            <style jsx>{`
        @keyframes particleFloat {
          0% { 
            opacity: 0.8;
            transform: translate(0, 0) scale(0.5);
          }
          100% { 
            opacity: 0;
            transform: translate(var(--translate-x), var(--translate-y)) scale(1.5);
          }
        }
      `}</style>
        </>
    );
};

export default ValueProposition;