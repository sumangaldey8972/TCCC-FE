// components/CoinLaunchpadDrawer.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, TrendingUp, Users, Calendar, ArrowUpRight, Rocket, BarChart3, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Coin, CoinStats } from '@/types/coin';
import appClient from '@/lib/appClient';

interface CoinLaunchpadDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    // upcomingCoins: Coin[];
    // launchedCoins: Coin[];
}

const CoinLaunchpadDrawer: React.FC<CoinLaunchpadDrawerProps> = ({
    isOpen,
    onClose,
    // upcomingCoins,
    // launchedCoins
}) => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'launched'>('upcoming');
    const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: string }>({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const sliderRef = useRef<NodeJS.Timeout | null>(null);
    const [data, setData] = useState<Coin[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalDocs, setTotalDocs] = useState(0)
    const [loading, setLoading] = useState(false)
    const [upcomingCoins, setUpComingCoins] = useState<Coin[]>([])
    const [launchedCoins, setLaunchedCoins] = useState<Coin[]>([])
    const [stats, setStats] = useState<CoinStats | null>(null)

    // Add this state at the top of your component
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });


    const handleGetCoins = useCallback(async () => {
        setLoading(true)
        try {
            const res = await appClient.get("/api/coins/get", {
                params: { status: activeTab, page, limit }
            })
            console.log({ res })
            if (res.data.status) {
                if (activeTab === "upcoming") {
                    setUpComingCoins(res.data.coins.docs)
                    setTotalDocs(res.data.coins.totalDocs)
                } else {
                    setLaunchedCoins(res.data.coins.docs)
                    setTotalDocs(res.data.coins.totalDocs)
                }
            }
        } catch (error) {
            console.log("getting error while get coin list", error)
        } finally {
            setLoading(false)
        }
    }, [activeTab, page, limit])

    useEffect(() => {
        handleGetCoins()
    }, [handleGetCoins])


    const handleGetCoinsStats = useCallback(async () => {
        setLoading(true)
        try {
            const res = await appClient.get("/api/coins/stats")
            console.log({ res })
            if (res.data.status) {
                setStats(res.data.data)
            }
        } catch (error) {
            console.log("getting error while get coin stats list", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        handleGetCoinsStats()
    }, [handleGetCoinsStats])

    // Add this effect for real-time countdown updates
    useEffect(() => {
        if (upcomingCoins.length > 0) {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const launchDate = new Date(upcomingCoins[0].launchDate).getTime();
                const distance = launchDate - now;

                if (distance > 0) {
                    setCountdown({
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((distance % (1000 * 60)) / 1000)
                    });
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [upcomingCoins]);

    // Calculate time remaining for upcoming coins
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const newTimeRemaining: { [key: number]: string } = {};

            upcomingCoins.forEach(coin => {
                const launchDate = new Date(coin.launchDate);
                const now = new Date();
                const difference = launchDate.getTime() - now.getTime();

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                    if (days > 0) {
                        newTimeRemaining[coin._id] = `${days}d ${hours}h`;
                    } else {
                        newTimeRemaining[coin._id] = `${hours}h ${minutes}m`;
                    }
                } else {
                    newTimeRemaining[coin._id] = 'Launched';
                }
            });

            setTimeRemaining(newTimeRemaining);
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 60000);

        return () => clearInterval(interval);
    }, [upcomingCoins]);

    // Auto-play slider
    useEffect(() => {
        if (isPlaying) {
            sliderRef.current = setInterval(() => {
                setCurrentSlide(prev => {
                    const totalSlides = Math.ceil((activeTab === 'upcoming' ? upcomingCoins.length - 1 : launchedCoins.length) / 3);
                    return (prev + 1) % totalSlides;
                });
            }, 5000);
        }

        return () => {
            if (sliderRef.current) {
                clearInterval(sliderRef.current);
            }
        };
    }, [isPlaying, activeTab, upcomingCoins.length, launchedCoins.length]);

    // Group coins into slides of 3
    const getGroupedCoins = () => {
        if (activeTab === 'upcoming') {
            // Skip the first coin (featured coin)
            const coinsToGroup = upcomingCoins.slice(1);
            const groups = [];
            for (let i = 0; i < coinsToGroup.length; i += 3) {
                groups.push(coinsToGroup.slice(i, i + 3));
            }
            return groups;
        } else {
            const groups = [];
            for (let i = 0; i < launchedCoins.length; i += 3) {
                groups.push(launchedCoins.slice(i, i + 3));
            }
            return groups;
        }
    };

    const groupedCoins = getGroupedCoins();
    const totalSlides = groupedCoins.length;

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
        setIsPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
        setIsPlaying(false);
    };

    // Prevent body scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-5xl bg-[#212121] shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#212121] border-b border-[#2a2e50] p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#c0c0c0] to-[#e5e5e5] bg-clip-text text-transparent">
                                        Coin Launchpad
                                    </h2>
                                    <p className="text-gray-400 mt-1">Powered by The Coin Cartel Community</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-[#2a2e50] hover:bg-[#3a3e60] transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center mt-6 bg-gradient-to-r from-[#fe6d4c]/20 to-[#f59b50]/20 p-3 rounded-lg border border-[#fe6d4c]/30">
                                <div className="flex-1 text-center border-r border-[#fe6d4c]/30">
                                    <p className="text-2xl font-bold text-white">{stats?.upcoming}</p>
                                    <p className="text-sm text-gray-400">Upcoming</p>
                                </div>
                                <div className="flex-1 text-center border-r border-[#fe6d4c]/30">
                                    <p className="text-2xl font-bold text-white">{stats?.launched}</p>
                                    <p className="text-sm text-gray-400">Launched</p>
                                </div>
                                <div className="flex-1 text-center">
                                    <p className="text-2xl font-bold text-white">{stats?.total}</p>
                                    <p className="text-sm text-gray-400">Total</p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex mt-6 space-x-0 bg-[#121212] rounded-lg border border-[#333] w-fit mx-auto overflow-hidden">
                                <button
                                    className={`px-6 py-3 font-medium transition-all duration-300 relative group ${activeTab === 'upcoming'
                                        ? 'bg-gradient-to-r from-[#bf953f]/10 to-transparent text-[#bf953f] border-r border-[#aa771c]/50'
                                        : 'text-[#C0C0C0] hover:text-[#bf953f] hover:bg-[#bf953f]/5'
                                        }`}
                                    onClick={() => {
                                        setActiveTab('upcoming');
                                        setCurrentSlide(0);
                                        setIsPlaying(true);
                                    }}
                                >
                                    <span className="relative z-10 flex items-center">
                                        <Rocket className="w-4 h-4 mr-2" />
                                        Upcoming
                                    </span>
                                    {activeTab === 'upcoming' && (
                                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#bf953f] to-[#aa771c]"></div>
                                    )}
                                </button>

                                <div className="w-px bg-[#333] my-2"></div>

                                <button
                                    className={`px-6 py-3 font-medium transition-all duration-300 relative group ${activeTab === 'launched'
                                        ? 'bg-gradient-to-r from-transparent to-[#8B0000]/10 text-[#8B0000] border-l border-[#700000]/50'
                                        : 'text-[#C0C0C0] hover:text-[#8B0000] hover:bg-[#8B0000]/5'
                                        }`}
                                    onClick={() => {
                                        setActiveTab('launched');
                                        setCurrentSlide(0);
                                        setIsPlaying(true);
                                    }}
                                >
                                    <span className="relative z-10 flex items-center">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        Launched
                                    </span>
                                    {activeTab === 'launched' && (
                                        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#8B0000] to-[#700000]"></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {activeTab === 'upcoming' ? (
                                <>
                                    {/* Featured Coin (First Coin) */}
                                    {upcomingCoins.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-[#bf953f] mb-4">Featured Upcoming Launch</h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="bg-gradient-to-br from-[#0A0A0A] via-[#121212] to-[#1a1a1a] rounded-2xl border-2 border-[#bf953f] p-6"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center">
                                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#bf953f] flex items-center justify-center mr-4">
                                                            <span className="text-[#bf953f] font-bold text-lg">
                                                                {upcomingCoins[0].symbol.slice(0, 2)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white text-xl">{upcomingCoins[0].name}</h3>
                                                            <p className="text-[#bf953f] text-sm">{upcomingCoins[0].symbol}</p>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 bg-[#bf953f]/20 text-[#bf953f] text-sm font-bold rounded-full border border-[#bf953f]/30">
                                                        FEATURED
                                                    </span>
                                                </div>

                                                <p className="text-[#C0C0C0] text-sm mb-6">{upcomingCoins[0].description}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Launch Date */}
                                                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                                                        <div className="flex items-center text-[#C0C0C0] text-sm mb-3">
                                                            <Calendar size={16} className="mr-2 text-[#bf953f]" />
                                                            Launch Date
                                                        </div>
                                                        <p className="text-white font-bold text-lg">
                                                            {new Date(upcomingCoins[0].launchDate).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>

                                                    {/* Countdown Timer */}
                                                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                                                        <div className="flex items-center text-[#C0C0C0] text-sm mb-3">
                                                            <Clock size={16} className="mr-2 text-[#bf953f]" />
                                                            Time Until Launch
                                                        </div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            {/* Days */}
                                                            <div className="text-center">
                                                                <div className="bg-[#bf953f]/10 rounded-lg p-2">
                                                                    <div className="text-[#bf953f] font-bold text-xl md:text-2xl">
                                                                        {countdown.days}
                                                                    </div>
                                                                    <div className="text-[#C0C0C0] text-xs mt-1">DAYS</div>
                                                                </div>
                                                            </div>

                                                            {/* Hours */}
                                                            <div className="text-center">
                                                                <div className="bg-[#bf953f]/10 rounded-lg p-2">
                                                                    <div className="text-[#bf953f] font-bold text-xl md:text-2xl">
                                                                        {countdown.hours}
                                                                    </div>
                                                                    <div className="text-[#C0C0C0] text-xs mt-1">HOURS</div>
                                                                </div>
                                                            </div>

                                                            {/* Minutes */}
                                                            <div className="text-center">
                                                                <div className="bg-[#bf953f]/10 rounded-lg p-2">
                                                                    <div className="text-[#bf953f] font-bold text-xl md:text-2xl">
                                                                        {countdown.minutes}
                                                                    </div>
                                                                    <div className="text-[#C0C0C0] text-xs mt-1">MINUTES</div>
                                                                </div>
                                                            </div>

                                                            {/* Seconds */}
                                                            <div className="text-center">
                                                                <div className="bg-[#bf953f]/10 rounded-lg p-2">
                                                                    <div className="text-[#bf953f] font-bold text-xl md:text-2xl">
                                                                        {countdown.seconds}
                                                                    </div>
                                                                    <div className="text-[#C0C0C0] text-xs mt-1">SECONDS</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Slider for remaining coins */}
                                    {groupedCoins.length > 0 && (
                                        <div className="relative">
                                            <h3 className="text-xl font-bold text-[#bf953f] mb-4">More Upcoming Launches</h3>

                                            {/* Slider Controls */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => setIsPlaying(!isPlaying)}
                                                        className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                    >
                                                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                                    </button>
                                                    <span className="text-sm text-[#C0C0C0]">
                                                        Auto-play {isPlaying ? 'On' : 'Off'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={prevSlide}
                                                        className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                    >
                                                        <ChevronLeft size={16} />
                                                    </button>
                                                    <span className="text-sm text-[#C0C0C0]">
                                                        {currentSlide + 1} / {totalSlides}
                                                    </span>
                                                    <button
                                                        onClick={nextSlide}
                                                        className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                    >
                                                        <ChevronRight size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Slider */}
                                            <div className="overflow-hidden">
                                                <motion.div
                                                    key={currentSlide}
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                                >
                                                    {groupedCoins[currentSlide]?.map((coin) => (
                                                        <div
                                                            key={coin._id}
                                                            className="bg-gradient-to-br from-[#0A0A0A] via-[#121212] to-[#1a1a1a] rounded-2xl border border-[#bf953f]/30 p-5"
                                                        >
                                                            <div className="flex justify-center mb-4">
                                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#bf953f] flex items-center justify-center">
                                                                    <span className="text-[#bf953f] font-bold text-sm">
                                                                        {coin.symbol.slice(0, 2)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="text-center mb-4">
                                                                <h3 className="font-bold text-white text-sm">{coin.name}</h3>
                                                                <p className="text-[#bf953f] text-xs">{coin.symbol}</p>
                                                                <span className="inline-block mt-2 px-2 py-1 bg-[#bf953f]/10 text-[#bf953f] text-xs font-medium rounded-full border border-[#bf953f]/30">
                                                                    UPCOMING
                                                                </span>
                                                            </div>

                                                            <p className="text-[#C0C0C0] text-xs text-center mb-4 line-clamp-3">
                                                                {coin.description}
                                                            </p>

                                                            <div className="text-center">
                                                                <div className="text-[#bf953f] font-bold text-sm mb-1">
                                                                    {timeRemaining[coin._id] || '--:--:--'}
                                                                </div>
                                                                <div className="text-[#C0C0C0] text-xs">
                                                                    {new Date(coin.launchDate).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </div>

                                            {/* Dots Indicator */}
                                            {totalSlides > 1 && (
                                                <div className="flex justify-center mt-6 space-x-2">
                                                    {Array.from({ length: totalSlides }).map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                setCurrentSlide(index);
                                                                setIsPlaying(false);
                                                            }}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                                                ? 'bg-[#bf953f] w-4'
                                                                : 'bg-[#333] hover:bg-[#555]'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Launched Coins Slider */
                                <div className="relative">
                                    <h3 className="text-xl font-bold text-[#00C851] mb-4">Successfully Launched</h3>

                                    {/* Slider Controls */}
                                    {totalSlides > 1 && (
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                    className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                >
                                                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                                </button>
                                                <span className="text-sm text-[#C0C0C0]">
                                                    Auto-play {isPlaying ? 'On' : 'Off'}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={prevSlide}
                                                    className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <span className="text-sm text-[#C0C0C0]">
                                                    {currentSlide + 1} / {totalSlides}
                                                </span>
                                                <button
                                                    onClick={nextSlide}
                                                    className="p-2 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Slider */}
                                    <div className="overflow-hidden">
                                        <motion.div
                                            key={currentSlide}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.5 }}
                                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                        >
                                            {groupedCoins[currentSlide]?.map((coin) => (
                                                <div
                                                    key={coin._id}
                                                    className="bg-gradient-to-br from-[#0A0A0A] via-[#121212] to-[#1a1a1a] rounded-2xl border border-[#00C851]/30 p-5"
                                                >
                                                    <div className="flex justify-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#00C851] flex items-center justify-center">
                                                            <span className="text-[#00C851] font-bold text-sm">
                                                                {coin.symbol.slice(0, 2)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-center mb-4">
                                                        <h3 className="font-bold text-white text-sm">{coin.name}</h3>
                                                        <p className="text-[#00C851] text-xs">{coin.symbol}</p>
                                                        <span className="inline-block mt-2 px-2 py-1 bg-[#00C851]/10 text-[#00C851] text-xs font-medium rounded-full border border-[#00C851]/30">
                                                            LAUNCHED
                                                        </span>
                                                    </div>

                                                    <p className="text-[#C0C0C0] text-xs text-center mb-4 line-clamp-3">
                                                        {coin.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Dots Indicator */}
                                    {totalSlides > 1 && (
                                        <div className="flex justify-center mt-6 space-x-2">
                                            {Array.from({ length: totalSlides }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setCurrentSlide(index);
                                                        setIsPlaying(false);
                                                    }}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                                        ? 'bg-[#00C851] w-4'
                                                        : 'bg-[#333] hover:bg-[#555]'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CoinLaunchpadDrawer;