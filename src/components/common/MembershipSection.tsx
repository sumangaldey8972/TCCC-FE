import React, { useState, useEffect } from 'react';
import { Check, Crown, Star, Zap, Clock, Users, ArrowRight } from 'lucide-react';

const MembershipSection = () => {
    const [earlyBirdClaimed, setEarlyBirdClaimed] = useState(72);
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 12,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const seconds = prev.seconds - 1;
                if (seconds >= 0) return { ...prev, seconds };

                const minutes = prev.minutes - 1;
                if (minutes >= 0) return { ...prev, minutes, seconds: 59 };

                const hours = prev.hours - 1;
                if (hours >= 0) return { ...prev, hours, minutes: 59, seconds: 59 };

                const days = prev.days - 1;
                if (days >= 0) return { ...prev, days, hours: 23, minutes: 59, seconds: 59 };

                clearInterval(timer);
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleJoinClick = (plan: string) => {
        // Redirect to signup/checkout with plan parameter
        console.log(`Redirecting to signup for ${plan} plan`);
    };

    return (
        <section id="pricing" className="relative py-16 md:py-24 px-4 bg-[#0A0E23] text-white overflow-hidden">
            {/* Oval top border */}
            <div className="absolute -top-20 left-0 right-0 h-40 bg-[#0A0E23] rounded-b-[50%] z-10"></div>

            {/* Background elements */}
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#fe6d4c] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-5 right-1/4 w-64 h-64 bg-[#f59b50] rounded-full opacity-10 blur-3xl"></div>

            <div className="container mx-auto max-w-6xl relative z-20 pt-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                            Join Our Community
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Become part of something big — choose your membership plan today.
                    </p>
                </div>

                {/* Early bird banner */}
                <div className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] rounded-2xl p-4 mb-12 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                            <Zap size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Early Bird Offer</h3>
                            <p className="text-white/90 text-sm">First 100 members get Starter for just $99</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Users size={16} className="mr-2" />
                            <span className="text-sm font-medium">{earlyBirdClaimed}/100 claimed</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            <span className="text-sm font-medium">
                                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#2a2e4a] rounded-full h-2 mb-12">
                    <div
                        className="bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] h-2 rounded-full"
                        style={{ width: `${earlyBirdClaimed}%` }}
                    ></div>
                </div>

                {/* Membership cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Starter Card */}
                    <div className="relative bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] opacity-0 hover:opacity-5 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
                            <p className="text-gray-400 mb-6">Perfect for beginners</p>

                            <div className="flex items-end mb-6">
                                <div className="flex items-start">
                                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                                        {earlyBirdClaimed < 100 ? '$99' : '$149'}
                                    </span>
                                    {earlyBirdClaimed < 100 && (
                                        <span className="text-lg text-gray-400 line-through ml-2">$299</span>
                                    )}
                                </div>
                                <span className="text-gray-400 ml-2">/ lifetime</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Access to community chat/forum</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Basic market insights</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Monthly newsletter</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleJoinClick('starter')}
                                className="w-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:shadow-lg transition-all duration-300 group"
                            >
                                Join Starter
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Pro Card */}
                    <div className="relative bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
                        {/* Popular badge */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                            <Star size={16} className="mr-2 fill-white" />
                            Most Popular
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] opacity-0 hover:opacity-5 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                            <p className="text-gray-400 mb-6">For serious traders</p>

                            <div className="flex items-end mb-6">
                                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">$500</span>
                                <span className="text-gray-400 ml-2">/ lifetime</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Everything in Starter</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Advanced market analysis</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Early access to new features</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Private AMAs & Q&A sessions</span>
                                </li>
                                <li className="flex items-center">
                                    <Check size={18} className="text-[#fe6d4c] mr-3" />
                                    <span className="text-gray-300">Exclusive alpha calls</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleJoinClick('pro')}
                                className="w-full bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:shadow-lg transition-all duration-300 group"
                            >
                                Join Pro
                                <Crown size={18} className="ml-2 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comparison table */}
                <div className="bg-gradient-to-br from-[#161932] to-[#0f1326] rounded-2xl p-8 border border-[#2a2e4a] mb-16">
                    <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#fe6d4c] to-[#f59b50] bg-clip-text text-transparent">
                        Feature Comparison
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#2a2e4a]">
                                    <th className="text-left pb-4 text-gray-400 font-normal">Features</th>
                                    <th className="text-center pb-4 text-gray-400 font-normal">Starter</th>
                                    <th className="text-center pb-4 text-gray-400 font-normal">Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#2a2e4a]">
                                    <td className="py-4 text-gray-300">Community Access</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                </tr>
                                <tr className="border-b border-[#2a2e4a]">
                                    <td className="py-4 text-gray-300">Basic Market Insights</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                </tr>
                                <tr className="border-b border-[#2a2e4a]">
                                    <td className="py-4 text-gray-300">Advanced Analysis</td>
                                    <td className="py-4 text-center text-gray-500">-</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                </tr>
                                <tr className="border-b border-[#2a2e4a]">
                                    <td className="py-4 text-gray-300">Private AMAs</td>
                                    <td className="py-4 text-center text-gray-500">-</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-300">Alpha Calls</td>
                                    <td className="py-4 text-center text-gray-500">-</td>
                                    <td className="py-4 text-center text-[#fe6d4c]">✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;