

// Animated crypto ticker that appears when section is visible
export const AnimatedCryptoTicker = () => {
    const coins = [
        { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', change: '+2.5%' },
        { symbol: 'ETH', name: 'Ethereum', price: '$2,350', change: '+1.8%' },
        { symbol: 'SOL', name: 'Solana', price: '$105', change: '+5.2%' },
        { symbol: 'XRP', name: 'Ripple', price: '$0.62', change: '-0.3%' },
    ];

    return (
        <div className="mt-16 p-6 bg-gradient-to-r from-[#161932] to-[#0f1326] rounded-2xl border border-[#2a2e4a] overflow-hidden">
            <div className="flex space-x-8 animate-marquee whitespace-nowrap">
                {[...coins, ...coins].map((coin, i) => (
                    <div key={i} className="inline-flex items-center space-x-4 px-4">
                        <span className="font-bold text-[#f59b50]">{coin.symbol}</span>
                        <span className="text-gray-300">{coin.name}</span>
                        <span className="font-mono">{coin.price}</span>
                        <span className={`font-bold ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {coin.change}
                        </span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};