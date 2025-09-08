import { NextResponse } from "next/server";

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

export async function GET() {
    const now = Date.now();

    // ✅ Serve from cache if still fresh
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
        return NextResponse.json(cachedData);
    }

    try {
        const [btcRes, ethRes] = await Promise.all([
            fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"),
            fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT"),
        ]);

        if (!btcRes.ok || !ethRes.ok) {
            throw new Error("Failed to fetch data from Binance");
        }

        const [btc, eth] = await Promise.all([btcRes.json(), ethRes.json()]);

        cachedData = {
            bitcoin: {
                usd: parseFloat(btc.lastPrice),
                change: parseFloat(btc.priceChangePercent),
            },
            ethereum: {
                usd: parseFloat(eth.lastPrice),
                change: parseFloat(eth.priceChangePercent),
            },
            lastUpdated: now,
        };

        lastFetchTime = now;

        return NextResponse.json(cachedData);
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
        return NextResponse.json(
            { error: "Failed to fetch crypto prices" },
            { status: 500 }
        );
    }
}
