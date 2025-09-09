import { BarChart3, ChartNoAxesCombined } from 'lucide-react';
import { useState, useEffect } from 'react';

const DexScreenerWidget = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeError, setIframeError] = useState(false);

    useEffect(() => {
        // Set a timeout to show error if iframe doesn't load within 10 seconds
        const timer = setTimeout(() => {
            if (!iframeLoaded) {
                setIframeError(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [iframeLoaded]);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
        setIframeError(false);
    };

    const handleIframeError = () => {
        setIframeError(true);
    };

    const reloadIframe = () => {
        setIframeLoaded(false);
        setIframeError(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#121212] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#bf953f] to-[#aa771c] mb-4 gold-embossed-text">
                        Real-Time DeFi Analytics
                    </h1>
                    <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto">
                        Track token prices, liquidity pools, and trading volume across all decentralized exchanges in real-time.
                    </p>
                </div>

                {/* Widget Container */}
                <div className="bg-[#121212] rounded-2xl overflow-hidden border border-[#333] shadow-2xl">
                    {/* Widget Header */}
                    <div className="flex flex-wrap items-center justify-between p-4 md:p-6 border-b border-[#333] bg-[#0A0A0A]">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="bg-gradient-to-br from-[#ff6b6b] via-[#8B0000] to-[#600000] p-2 rounded-lg shadow-lg border border-[#8B0000] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform -skew-x-12"></div>
                                <svg className="w-6 h-6 text-white drop-shadow-md relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">DexScreener Analytics</h2>
                                <p className="text-sm text-[#A8A8A8]">Live on-chain data & charts</p>
                            </div>
                        </div>
                    </div>

                    {/* Widget Body */}
                    <div className="relative">
                        {/* Loading State */}
                        {!iframeLoaded && !iframeError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-10">
                                <div className="text-center">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf953f] mb-4"></div>
                                    <p className="text-lg font-medium text-white">Loading DexScreener...</p>
                                    <p className="text-sm text-[#A8A8A8] mt-1">This may take a few moments</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {iframeError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-20">
                                <div className="text-center p-6 max-w-md">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#8B0000]/20 mb-4">
                                        <svg className="h-6 w-6 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Failed to Load DexScreener</h3>
                                    <p className="text-[#C0C0C0] mb-4">
                                        We couldn&apos;t load the DexScreener widget. This might be due to a network issue or an ad blocker.
                                    </p>
                                    <button
                                        onClick={reloadIframe}
                                        className="px-4 py-2 bg-gradient-to-r from-[#bf953f] to-[#aa771c] hover:from-[#c9a45a] hover:to-[#b58528] rounded-lg text-white font-medium transition-all"
                                    >
                                        Try Again
                                    </button>
                                    <div className="mt-6 text-left bg-[#121212] p-4 rounded-lg border border-[#333]">
                                        <p className="text-sm text-[#C0C0C0] font-medium mb-2">Alternatively, you can:</p>
                                        <ul className="text-sm text-[#A8A8A8] space-y-1">
                                            <li>• Check your internet connection</li>
                                            <li>• Disable ad blockers for this site</li>
                                            <li>• Visit DexScreener directly at <a href="https://dexscreener.com" className="text-[#bf953f] hover:underline">dexscreener.com</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Iframe */}
                        <iframe
                            src="https://dexscreener.com/"
                            width="100%"
                            height="600"
                            className="w-full"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            style={{ border: 'none', background: '#1e1e1e' }}
                        />
                    </div>

                    {/* Widget Footer */}
                    <div className="p-4 md:p-6 bg-[#0A0A0A] border-t border-[#333]">
                        <div className="flex flex-wrap items-center justify-between">
                            <p className="text-sm text-[#A8A8A8] mb-2 md:mb-0">
                                Powered by <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="text-[#bf953f] hover:text-[#fcf6ba] hover:underline transition-colors">DexScreener</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-[#121212] p-6 rounded-2xl border border-[#333] hover:border-[#bf953f] transition-colors">
                        <div className="bg-gradient-to-br from-[#ff6b6b] via-[#8B0000] to-[#600000] p-3 rounded-xl inline-block mb-4 shadow-lg border border-[#8B0000] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform -skew-x-12"></div>
                            <BarChart3 className="w-6 h-6 text-white drop-shadow-md relative z-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Real-Time Data</h3>
                        <p className="text-[#A8A8A8]">Get live updates on token prices, liquidity, and trading volume across all DEXs.</p>
                    </div>

                    <div className="bg-[#121212] p-6 rounded-2xl border border-[#333] hover:border-[#bf953f] transition-colors">
                        <div className="bg-gradient-to-br from-[#ff6b6b] via-[#8B0000] to-[#600000] p-3 rounded-xl inline-block mb-4 shadow-lg border border-[#8B0000] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform -skew-x-12"></div>
                            <ChartNoAxesCombined className="w-6 h-6 text-white drop-shadow-md relative z-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Advanced Charts</h3>
                        <p className="text-[#A8A8A8]">Access professional trading charts with technical indicators and drawing tools.</p>
                    </div>

                    <div className="bg-[#121212] p-6 rounded-2xl border border-[#333] hover:border-[#bf953f] transition-colors">
                        <div className="bg-gradient-to-br from-[#ff6b6b] via-[#8B0000] to-[#600000] p-3 rounded-xl inline-block mb-4 shadow-lg border border-[#8B0000] relative overflow-hidden">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Multi-Chain Support</h3>
                        <p className="text-[#A8A8A8]">Track tokens across Ethereum, BSC, Polygon, Avalanche, and other major chains.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DexScreenerWidget;